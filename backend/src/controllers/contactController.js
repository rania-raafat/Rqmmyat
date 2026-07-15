import Contact from "../models/Contact.js";
import { sendEmail } from "../utils/sendEmail.js";

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        message: "Contact not found",
      });
    }

    res.json(contact);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const createContact = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);

    try {
      // Thank-you email to user
      await sendEmail(
        req.body.email,
        "Thank You For Contacting RQMMYAT",
        `
        <div style="
          max-width:700px;
          margin:auto;
          padding:40px;
          background:#07130d;
          color:#ffffff;
          font-family:Arial,sans-serif;
        ">
          <h1 style="color:#00ff66;">
            RQMMYAT
          </h1>

          <h2>Hello ${req.body.name},</h2>

          <p>
            Thank you for contacting RQMMYAT.
          </p>

          <p>
            We have received your message successfully
            and one of our specialists will contact you shortly.
          </p>

          <p>
            We appreciate your interest in our services.
          </p>

          <br>

          <strong style="color:#00ff66;">
            RQMMYAT Team
          </strong>
        </div>
        `,
      );

      // Notification email to you
      await sendEmail(
        "raniaraafat421@gmail.com",
        "New Contact Request",
        `
        <h2>New Contact Request</h2>

        <p><strong>Name:</strong> ${req.body.name}</p>

        <p><strong>Email:</strong> ${req.body.email}</p>

        <p><strong>Phone:</strong> ${req.body.phone || "N/A"}</p>

        <p><strong>Company:</strong> ${req.body.company || "N/A"}</p>

        <p><strong>Service:</strong> ${req.body.service || "N/A"}</p>

        <p><strong>Message:</strong></p>

        <p>${req.body.message}</p>
        `,
      );
    } catch (emailError) {
      console.error("Email sending failed:", emailError.message);
    }

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      contact,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!contact) {
      return res.status(404).json({
        message: "Contact not found",
      });
    }

    res.json(contact);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({
        message: "Contact not found",
      });
    }

    res.json({
      message: "Contact deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
