import { mailOptions, transporter } from "../../config/nodemailerConfig";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;
    if (!data || !data.email || !data.subject || !data.message) {
      return res.status(400).send({ message: "Bad request" });
    }

    try {
      await transporter.sendMail({
        ...mailOptions,
        to:data.email,
        subject: data.subject,
        text: data.message,
        html: data.message
      });

      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }
  return res.status(400).json({ message: "Bad request" });
};
export default handler;