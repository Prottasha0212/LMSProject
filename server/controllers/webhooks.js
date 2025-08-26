import { Webhook } from "svix";
import User from "../models/User.js";
import Stripe from "stripe";
import { Purchase } from "../models/Purchase.js";
import Course from "../models/Course.js";

export const clerkWebhooks = async (req, res) => {
  // console.log("clerk")
  // exit(123)
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = req.body;
    console.log("Clerk webhook received:", type);

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          imageUrl: data.image_url,
          enrolledCourses:[]
        };
        await User.create(userData);
        break;
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          imageUrl: data.image_url,
        };
        await User.findByIdAndUpdate(data.id, userData);
        break;
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        break;
      }

      default:
        console.log("Unhandled Clerk event:", type);
    }

    res.json({ success: true });
  } catch (error) {
    console.error("Clerk webhook error:", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhooks = async (req, res) => {
  // console.log("stripeWebhooks")
  // exit(123)
  const sig = req.headers["stripe-signature"];

  let event;
  try {
    // ✅ FIX: use stripeInstance.webhooks, not Stripe.webhooks
    event = stripeInstance.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    console.log("Stripe event received:", event.type);
  } catch (err) {
    console.error("Stripe webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object;
      console.log("PaymentIntent succeeded:", paymentIntent.id);

      const sessionList = await stripeInstance.checkout.sessions.list({
        payment_intent: paymentIntent.id,
      });

      const session = sessionList.data[0];
      if (!session?.metadata?.purchaseId) {
        console.log("⚠️ Session or purchaseId missing for paymentIntent:", paymentIntent.id);
        break;
      }

      const purchaseData = await Purchase.findById(session.metadata.purchaseId);
      if (!purchaseData) {
        console.log("⚠️ Purchase not found:", session.metadata.purchaseId);
        break;
      }
      
      // console.log(purchaseData)
      // exit(123)
      if (purchaseData.status !== "completed") {
        purchaseData.status = "completed";
        await purchaseData.save();

        const userData = await User.findById(purchaseData.userId);
        const courseData = await Course.findById(purchaseData.courseId.toString());

        if (userData && courseData) {
          if (!courseData.enrolledStudents.includes(userData._id)) {
            courseData.enrolledStudents.push(userData._id);
            await courseData.save();
          }
          if (!userData.enrolledCourses.includes(courseData._id)) {
            userData.enrolledCourses.push(courseData._id);
            await userData.save();
          }
        }
      }
      break;
    }

    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object;
      console.log("PaymentIntent failed:", paymentIntent.id);

      const sessionList = await stripeInstance.checkout.sessions.list({
        payment_intent: paymentIntent.id,
      });

      const session = sessionList.data[0];
      if (!session?.metadata?.purchaseId) {
        console.log("⚠️ Session or purchaseId missing for failed paymentIntent:", paymentIntent.id);
        break;
      }

      const purchaseData = await Purchase.findById(session.metadata.purchaseId);
      if (purchaseData) {
        purchaseData.status = "failed";
        await purchaseData.save();
      }
      break;
    }

    default:
      console.log("Unhandled Stripe event type:", event.type);
  }

  res.json({ received: true });
};
