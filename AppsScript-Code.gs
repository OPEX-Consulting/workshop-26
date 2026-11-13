const SPREADSHEET_ID = "YOUR_GOOGLE_SHEET_ID";
const SHEET_NAME = "WebinarResponses";

function doPost(e) {
  const lock = LockService.getScriptLock();

  try {
    lock.waitLock(10000);

    if (!e || !e.postData || !e.postData.contents) {
      throw new Error("No registration data was received.");
    }

    const data = JSON.parse(e.postData.contents);

    const fullName = String(data.fullName || "").trim();
    const email = String(data.email || "").trim();
    const referralSource = String(data.referralSource || "").trim();

    if (!fullName || !email || !referralSource) {
      throw new Error("Full name, email, and referral source are required.");
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      throw new Error("Please provide a valid email address.");
    }

    const sheet = getResponseSheet();

    sheet.appendRow([fullName, email, referralSource]);

    return jsonResponse({
      success: true,
      message: "Registration submitted successfully.",
    });
  } catch (error) {
    return jsonResponse({
      success: false,
      message: error.message || "Registration failed.",
    });
  } finally {
    if (lock.hasLock()) {
      lock.releaseLock();
    }
  }
}

function doGet() {
  return jsonResponse({
    success: true,
    message: "OPEX webinar registration endpoint is running.",
  });
}

function getResponseSheet() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);

  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Full Name", "Email", "Referral Source"]);

    sheet.setFrozenRows(1);
  }

  return sheet;
}

function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON
  );
}
