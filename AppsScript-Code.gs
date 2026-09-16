/**
 * OPEX Executive Workshop registration endpoint.
 *
 * Paste this entire file into the Apps Script project attached to your
 * Google Sheet. Configure the values under Project Settings > Script properties:
 *
 * EMAIL_FROM_NAME = OPEX Consulting
 * EMAIL_REPLY_TO  = events@yourcompany.com
 * EMAIL_CC        = logistics@yourcompany.com
 */

const TAB_NAME = "Responses";

function setup() {
  const sheet = getSheet();

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Submitted At",
      "Name",
      "Email",
      "Role",
      "Organisation",
      "Route",
      "Session",
      "Score",
      "Readiness Band",
      "Priority",
      "Answers",
    ]);
  }
}

function doGet() {
  return json({ ok: true, service: "OPEX registration" });
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    if (!e || !e.postData || !e.postData.contents) {
      return json({ ok: false, error: "Missing request body" });
    }

    const data = JSON.parse(e.postData.contents);
    validateRegistration(data);

    const sheet = getSheet();
    sheet.appendRow([
      new Date(),
      clean(data.name),
      clean(data.email),
      clean(data.role),
      clean(data.organisation),
      clean(data.route),
      clean(data.session),
      data.pct ?? "",
      clean(data.band),
      clean(data.priority),
      JSON.stringify(data.answers || {}),
    ]);

    let emailSent = false;
    try {
      sendConfirmationEmail(data);
      emailSent = true;
    } catch (error) {
      console.error(`Confirmation email failed: ${error.message}`);
    }

    return json({ ok: true, emailSent });
  } catch (error) {
    console.error(error);
    return json({ ok: false, error: error.message });
  } finally {
    lock.releaseLock();
  }
}

function sendConfirmationEmail(data) {
  const properties = PropertiesService.getScriptProperties();
  const fromName = properties.getProperty("EMAIL_FROM_NAME") || "OPEX Consulting";
  const replyTo = properties.getProperty("EMAIL_REPLY_TO");
  const cc = properties.getProperty("EMAIL_CC") || "";

  if (!replyTo) {
    throw new Error("EMAIL_REPLY_TO is not configured");
  }

  const recipientName = clean(data.name);
  const session = clean(data.session);
  const safeName = escapeHtml(recipientName);
  const safeSession = escapeHtml(session);

  const subject = "Your OPEX Executive Workshop registration is confirmed";

  const textBody = `Dear ${recipientName},

Thank you for registering for the OPEX Executive Workshop.

Your place is confirmed:

Session: ${session}
Date: Monday 12 October 2026
Venue: The Wheatbaker, Ikoyi

Please arrive 15 minutes before your session begins.

If you have any questions, reply to this email or contact ${replyTo}.

We look forward to welcoming you.

Regards,
${fromName}`;

  const htmlBody = `
    <div style="background:#f6f8fb;padding:32px 16px;font-family:Arial,sans-serif;color:#15213b;">
      <div style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #d9e1ec;border-radius:10px;overflow:hidden;">
        <div style="background:#0e1b38;padding:28px 32px;color:#ffffff;">
          <div style="font-size:11px;letter-spacing:1.5px;color:#60a5fa;font-weight:bold;">OPEX CONSULTING</div>
          <h1 style="font-family:Georgia,serif;font-size:32px;line-height:1.1;font-weight:normal;margin:16px 0 0;">Registration confirmed</h1>
        </div>
        <div style="padding:30px 32px;font-size:15px;line-height:1.6;">
          <p>Dear ${safeName},</p>
          <p>Thank you for registering for the OPEX Executive Workshop. Your place is confirmed.</p>
          <div style="background:#eff6ff;border:1px solid #d9e1ec;border-radius:8px;padding:18px 20px;margin:24px 0;">
            <div style="font-size:11px;letter-spacing:1px;color:#2563eb;font-weight:bold;margin-bottom:8px;">YOUR SESSION</div>
            <strong style="font-size:20px;">${safeSession}</strong>
            <div style="margin-top:8px;">Monday 12 October 2026</div>
            <div>The Wheatbaker, Ikoyi</div>
          </div>
          <p>Please arrive 15 minutes before your session begins.</p>
          <p>If you have any questions, reply to this email or contact <a href="mailto:${escapeHtml(replyTo)}">${escapeHtml(replyTo)}</a>.</p>
          <p>We look forward to welcoming you.</p>
          <p>Regards,<br>${escapeHtml(fromName)}</p>
        </div>
      </div>
    </div>`;

  const message = {
    to: clean(data.email),
    subject,
    body: textBody,
    htmlBody,
    name: fromName,
    replyTo,
  };

  if (cc) message.cc = cc;
  MailApp.sendEmail(message);
}

function getSheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(TAB_NAME);
  if (!sheet) throw new Error(`Missing sheet tab: ${TAB_NAME}`);
  return sheet;
}

function validateRegistration(data) {
  const required = ["name", "email", "role", "organisation", "session"];
  const missing = required.filter((key) => !clean(data[key]));
  if (missing.length) throw new Error(`Missing fields: ${missing.join(", ")}`);
  if (!/^\S+@\S+\.\S+$/.test(clean(data.email))) throw new Error("Invalid email address");
}

function clean(value) {
  return String(value ?? "").trim();
}

function escapeHtml(value) {
  return clean(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function json(value) {
  return ContentService
    .createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}
