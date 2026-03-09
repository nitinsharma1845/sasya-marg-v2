export const newsLatterTemplate = ({ unSubscribeUrl, websiteUrl }) => {
  // Brand Colors based on your provided CSS variables
  const colors = {
    background: "#fafaf9", // Pale Cream
    foreground: "#364219", // Deep Moss
    primary: "#5c6f2b",    // Olive
    muted: "#6b7750",      // Lighter Moss
    accent: "#eab308",     // Sun Yellow
    border: "#d6dbc8"      // Soft border
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Welcome to Sasya Marg</title>
</head>
<body style="margin:0; padding:0; background-color:${colors.background}; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: ${colors.foreground};">

<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${colors.background}; padding: 40px 10px;">
  <tr>
    <td align="center">
      <table width="600" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff; border: 1px solid ${colors.border}; border-radius:12px; overflow:hidden; box-shadow:0 4px 12px rgba(54,66,25,0.05);">
        
        <tr>
          <td align="center" style="padding: 40px 20px; background-color: #ffffff; border-bottom: 1px solid ${colors.background};">
            <div style="display: inline-block; padding: 12px; border-radius: 10px; margin-bottom: 15px;">
               <img src="https://res.cloudinary.com/dq0ltmja4/image/upload/v1772435826/sasyamarg_logo_wtzjzu.png" width="60" height="60" alt="Sasya Marg Logo" style="display: block;">
            </div>
            <h1 style="margin:0; font-size:24px; color:${colors.foreground}; font-weight: 700; letter-spacing: -0.5px;">Sasya Marg</h1>
            <p style="margin:5px 0 0 0; font-size:14px; color:${colors.muted}; text-transform: uppercase; letter-spacing: 1.5px;">Path of crop</p>
          </td>
        </tr>

        <tr>
          <td style="padding: 40px 40px 20px 40px;">
            <h2 style="margin:0 0 15px 0; font-size:22px; color:${colors.primary};">Welcome to the future of farming.</h2>
            <p style="margin:0; font-size:16px; line-height:1.6; color:${colors.foreground};">
              Hello there! You’ve successfully subscribed to the Sasya Marg newsletter. You are now part of an ecosystem dedicated to bridging the gap between traditional farming and modern AI insights.
            </p>
          </td>
        </tr>

        <tr>
          <td style="padding: 0 40px 30px 40px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding: 15px; background-color: ${colors.background}; border-radius: 8px;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="font-size: 15px; line-height: 1.6;">
                        <div style="margin-bottom: 8px; font-weight: bold; color: ${colors.primary};">🌱 AI-Powered Crop Suggestions</div>
                        <div style="margin-bottom: 8px; font-weight: bold; color: ${colors.primary};">📈 Real-time Mandi Price Analytics</div>
                        <div style="margin-bottom: 8px; font-weight: bold; color: ${colors.primary};">🏛 Verified Government Schemes</div>
                        <div style="font-weight: bold; color: ${colors.primary};">🚜 Precision Agriculture Tips</div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td align="center" style="padding: 10px 40px 40px 40px;">
            <a href="${websiteUrl}" style="display:inline-block; padding:16px 36px; background-color:${colors.primary}; color:#ffffff; text-decoration:none; font-size:16px; border-radius:8px; font-weight:600; box-shadow: 0 4px 10px rgba(92, 111, 43, 0.2);">
              Access Your Dashboard
            </a>
            <p style="margin-top: 20px; font-size: 13px; color: ${colors.muted};">
              Explore smart tools designed specifically for your soil and region.
            </p>
          </td>
        </tr>

        <tr>
          <td align="center" style="background-color: #f9fafb; padding: 30px; border-top: 1px solid ${colors.border};">
            <p style="margin:0 0 10px 0; font-size:12px; color:${colors.muted}; line-height: 1.5;">
              You received this because you signed up via the Sasya Marg portal.<br>
              Empowering farmers through data-driven decisions.
            </p>
            <table cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding-right: 15px;">
                  <a href="${websiteUrl}" style="font-size:12px; color:${colors.primary}; text-decoration:none; font-weight:600;">Website</a>
                </td>
                <td style="border-left: 1px solid ${colors.border}; padding-left: 15px;">
                  <a href="${unSubscribeUrl}" style="font-size:12px; color:${colors.muted}; text-decoration:none;">Unsubscribe</a>
                </td>
              </tr>
            </table>
            <p style="margin:20px 0 0 0; font-size:11px; color:${colors.muted}; opacity: 0.7;">
              © 2026 Sasya Marg. All Rights Reserved.
            </p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>

</body>
</html>`;
};


export const registrationTemplate = ({ userName, loginUrl, websiteUrl }) => {
  const colors = {
    background: "#fafaf9", // Pale Cream
    foreground: "#364219", // Deep Moss
    primary: "#5c6f2b",    // Olive
    muted: "#6b7750",      // Lighter Moss
    accent: "#eab308",     // Sun Yellow
    border: "#d6dbc8",     // Soft border
    white: "#ffffff"
  };

  const logoUrl = "https://res.cloudinary.com/dq0ltmja4/image/upload/v1772435826/sasyamarg_logo_wtzjzu.png";

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Welcome to Sasya Marg</title>
</head>
<body style="margin:0; padding:0; background-color:${colors.background}; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: ${colors.foreground};">

<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${colors.background}; padding: 40px 10px;">
  <tr>
    <td align="center">
      <table width="600" cellpadding="0" cellspacing="0" border="0" style="background:${colors.white}; border: 1px solid ${colors.border}; border-radius:10px; overflow:hidden; box-shadow:0 4px 20px rgba(54,66,25,0.04);">
        
        <tr>
          <td align="center" style="padding: 40px 20px; border-bottom: 1px solid ${colors.background};">
            <img src="${logoUrl}" alt="Sasya Marg Logo" width="180" style="display: block; max-width: 100%; height: auto;">
          </td>
        </tr>

        <tr>
          <td style="padding: 40px 40px 10px 40px;">
            <h1 style="margin:0 0 15px 0; font-size:24px; color:${colors.foreground}; font-weight: 700;">Account Created Successfully!</h1>
            <p style="margin:0; font-size:16px; line-height:1.6; color:${colors.foreground};">
              Hello <strong>${userName || 'Farmer'}</strong>,
            </p>
            <p style="margin:15px 0 0 0; font-size:16px; line-height:1.6; color:${colors.foreground};">
              Welcome to <strong>Sasya Marg</strong>. We are excited to help you transform your agricultural journey with data-driven insights and AI-powered crop management.
            </p>
          </td>
        </tr>

        <tr>
          <td style="padding: 30px 40px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: ${colors.background}; border-radius: 8px;">
              <tr>
                <td style="padding: 20px;">
                  <h3 style="margin:0 0 10px 0; font-size:14px; text-transform: uppercase; letter-spacing: 1px; color:${colors.primary};">Getting Started:</h3>
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td width="24" valign="top" style="padding-top: 4px;">✅</td>
                      <td style="padding-bottom: 10px; font-size: 15px;">Complete your <strong>Farm Profile</strong> for better suggestions.</td>
                    </tr>
                    <tr>
                      <td width="24" valign="top" style="padding-top: 4px;">✅</td>
                      <td style="padding-bottom: 10px; font-size: 15px;">Check <strong>Real-time Mandi Prices</strong> for your region.</td>
                    </tr>
                    <tr>
                      <td width="24" valign="top" style="padding-top: 4px;">✅</td>
                      <td style="font-size: 15px;">Explore <strong>Government Schemes</strong> curated for you.</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td align="center" style="padding: 10px 40px 40px 40px;">
            <a href="${loginUrl}" style="display:inline-block; padding:16px 40px; background-color:${colors.primary}; color:${colors.white}; text-decoration:none; font-size:16px; border-radius:6px; font-weight:600;">
              Login to Your Dashboard
            </a>
            <p style="margin-top: 25px; font-size: 14px; color: ${colors.muted};">
              Need help? Reach out to us at <a href="mailto:support@sasyamarg.com" style="color:${colors.primary}; text-decoration:none;">support@sasyamarg.com</a>
            </p>
          </td>
        </tr>

        <tr>
          <td align="center" style="background-color: ${colors.foreground}; padding: 30px;">
            <p style="margin:0 0 10px 0; font-size:12px; color:${colors.white}; opacity: 0.8;">
              Sasya Marg — Empowering Farmers with Agri-Intelligence
            </p>
            <table cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td>
                  <a href="${websiteUrl}" style="font-size:12px; color:${colors.white}; text-decoration:none; margin-right: 15px;">Official Website</a>
                </td>
                <td style="border-left: 1px solid rgba(255,255,255,0.2); padding-left: 15px;">
                  <a href="${websiteUrl}/privacy" style="font-size:12px; color:${colors.white}; text-decoration:none;">Privacy Policy</a>
                </td>
              </tr>
            </table>
            <p style="margin:20px 0 0 0; font-size:11px; color:${colors.white}; opacity: 0.5;">
              © 2026 Sasya Marg. All Rights Reserved.
            </p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>

</body>
</html>`;
};

export const contactUsAutoResponseTemplate = ({ userName, ticketId, websiteUrl }) => {
  const colors = {
    background: "#fafaf9", // Pale Cream
    foreground: "#364219", // Deep Moss
    primary: "#5c6f2b",    // Olive
    muted: "#6b7750",      // Lighter Moss
    border: "#d6dbc8",     // Soft border
    white: "#ffffff"
  };

  const logoUrl = "https://res.cloudinary.com/dq0ltmja4/image/upload/v1772435826/sasyamarg_logo_wtzjzu.png";

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>We've Received Your Message - Sasya Marg</title>
</head>
<body style="margin:0; padding:0; background-color:${colors.background}; font-family: 'Inter', sans-serif; color: ${colors.foreground};">

<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${colors.background}; padding: 40px 10px;">
  <tr>
    <td align="center">
      <table width="600" cellpadding="0" cellspacing="0" border="0" style="background:${colors.white}; border: 1px solid ${colors.border}; border-radius:12px; overflow:hidden;">
        
        <tr>
          <td align="center" style="padding: 30px 20px; border-bottom: 1px solid ${colors.background};">
            <img src="${logoUrl}" alt="Sasya Marg Logo" width="160" style="display: block;">
          </td>
        </tr>

        <tr>
          <td style="padding: 40px;">
            <h1 style="margin:0 0 20px 0; font-size:22px; color:${colors.foreground};">Hi ${userName || 'there'},</h1>
            <p style="margin:0 0 15px 0; font-size:16px; line-height:1.6;">
              Thank you for reaching out to <strong>Sasya Marg</strong>. We’ve received your message and our team is already looking into it.
            </p>
            <p style="margin:0 0 30px 0; font-size:16px; line-height:1.6;">
              Whether you have a question about our AI crop suggestions, market prices, or technical support, we’re here to help you grow better.
            </p>

            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: ${colors.background}; border-radius: 8px; border: 1px dashed ${colors.primary};">
              
            </table>
          </td>
        </tr>

        <tr>
          <td style="padding: 0 40px 40px 40px;">
            <p style="margin:0 0 15px 0; font-size:14px; font-weight: bold;">While you wait, you might find these helpful:</p>
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding-bottom: 10px;">
                  <a href="${websiteUrl}/faq" style="color:${colors.primary}; text-decoration:none; font-size:14px;">• Frequently Asked Questions</a>
                </td>
              </tr>
              <tr>
                <td style="padding-bottom: 10px;">
                  <a href="${websiteUrl}/schemes" style="color:${colors.primary}; text-decoration:none; font-size:14px;">• Browse Government Schemes</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td align="center" style="background-color: ${colors.foreground}; padding: 30px;">
            <p style="margin:0 0 10px 0; font-size:12px; color:${colors.white};">
              This is an automated response. Please do not reply directly to this email.
            </p>
            <p style="margin:0; font-size:11px; color:${colors.white}; opacity: 0.6;">
              © 2026 Sasya Marg. Empowering the roots of our nation.
            </p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>

</body>
</html>`;
};


export const publicQueryReplyTemplate = ({ userName, querySubject, adminMessage, ticketId, websiteUrl }) => {
  const colors = {
    background: "#fafaf9", // Pale Cream
    foreground: "#364219", // Deep Moss
    primary: "#5c6f2b",    // Olive
    muted: "#6b7750",      // Lighter Moss
    border: "#d6dbc8",     // Soft border
    white: "#ffffff",
    accent: "#eab308"      // Sun Yellow
  };

  const logoUrl = "https://res.cloudinary.com/dq0ltmja4/image/upload/v1772435826/sasyamarg_logo_wtzjzu.png";

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Response to Your Inquiry - Sasya Marg</title>
</head>
<body style="margin:0; padding:0; background-color:${colors.background}; font-family: 'Inter', -apple-system, sans-serif; color: ${colors.foreground};">

<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${colors.background}; padding: 40px 10px;">
  <tr>
    <td align="center">
      <table width="600" cellpadding="0" cellspacing="0" border="0" style="background:${colors.white}; border: 1px solid ${colors.border}; border-radius:12px; overflow:hidden; box-shadow: 0 4px 6px rgba(54,66,25,0.03);">
        
        <tr>
          <td align="center" style="padding: 30px 20px; border-bottom: 1px solid ${colors.background};">
            <img src="${logoUrl}" alt="Sasya Marg Logo" width="150" style="display: block;">
          </td>
        </tr>

        <tr>
          <td style="padding: 40px;">
            <p style="margin:0 0 10px 0; font-size:14px; color:${colors.muted}; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">
              Support Response • #${ticketId || 'SM-QUERY'}
            </p>
            <h1 style="margin:0 0 25px 0; font-size:24px; color:${colors.foreground};">Hi ${userName || 'User'},</h1>
            
            <p style="margin:0 0 20px 0; font-size:16px; line-height:1.6; color:${colors.foreground};">
              Thank you for reaching out to us regarding <strong>"${querySubject || 'your inquiry'}"</strong>. Our team has reviewed your message, and we have the following update for you:
            </p>

            <div style="background-color: ${colors.background}; border-left: 4px solid ${colors.primary}; padding: 25px; margin-bottom: 30px; border-radius: 0 8px 8px 0;">
              <p style="margin:0; font-size:16px; line-height:1.7; color:${colors.foreground}; white-space: pre-wrap;">${adminMessage}</p>
            </div>

            <p style="margin:0 0 30px 0; font-size:16px; line-height:1.6;">
              We hope this addresses your concerns. If you need further clarification or have more questions, simply reply to this email or visit our help center.
            </p>

            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td align="left">
                  <a href="${websiteUrl}/dashboard" style="display:inline-block; padding:14px 30px; background-color:${colors.primary}; color:${colors.white}; text-decoration:none; font-size:15px; border-radius:6px; font-weight:600;">
                    Visit Dashboard
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td style="padding: 0 40px 40px 40px;">
            <p style="margin:0; font-size:15px; color:${colors.foreground};">
              Best regards,<br>
              <strong style="color:${colors.primary};">The Sasya Marg Team</strong>
            </p>
          </td>
        </tr>

        <tr>
          <td align="center" style="background-color: ${colors.foreground}; padding: 30px;">
            <p style="margin:0 0 15px 0; font-size:12px; color:${colors.white}; opacity: 0.8;">
              Sasya Marg — Agri-Intelligence & Smart Farming Portal
            </p>
            <div style="margin-bottom: 15px;">
              <a href="${websiteUrl}" style="color:${colors.white}; text-decoration:none; font-size:12px; margin: 0 10px;">Home</a>
              <a href="${websiteUrl}/help" style="color:${colors.white}; text-decoration:none; font-size:12px; margin: 0 10px;">Help Center</a>
              <a href="${websiteUrl}/privacy" style="color:${colors.white}; text-decoration:none; font-size:12px; margin: 0 10px;">Privacy</a>
            </div>
            <p style="margin:0; font-size:11px; color:${colors.white}; opacity: 0.5;">
              © 2026 Sasya Marg. All Rights Reserved.
            </p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>

</body>
</html>`;
};

export const userBlockTemplate = ({ userName, reason, supportEmail, websiteUrl }) => {
  const colors = {
    background: "#fafaf9", // Pale Cream
    foreground: "#364219", // Deep Moss
    primary: "#5c6f2b",    // Olive
    destructive: "#c2410c", // Earthy Orange/Red
    muted: "#6b7750",      // Lighter Moss
    border: "#d6dbc8",     // Soft border
    white: "#ffffff"
  };

  const logoUrl = "https://res.cloudinary.com/dq0ltmja4/image/upload/v1772435826/sasyamarg_logo_wtzjzu.png";

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Account Status Update - Sasya Marg</title>
</head>
<body style="margin:0; padding:0; background-color:${colors.background}; font-family: 'Inter', -apple-system, sans-serif; color: ${colors.foreground};">

<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${colors.background}; padding: 40px 10px;">
  <tr>
    <td align="center">
      <table width="600" cellpadding="0" cellspacing="0" border="0" style="background:${colors.white}; border: 1px solid ${colors.border}; border-radius:12px; overflow:hidden; box-shadow: 0 4px 15px rgba(54,66,25,0.05);">
        
        <tr>
          <td align="center" style="padding: 30px 20px; border-bottom: 1px solid ${colors.background};">
            <img src="${logoUrl}" alt="Sasya Marg Logo" width="150" style="display: block;">
          </td>
        </tr>

        <tr>
          <td align="center" style="background-color: ${colors.destructive}; padding: 12px; color: ${colors.white}; font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">
            Important Account Notice
          </td>
        </tr>

        <tr>
          <td style="padding: 40px;">
            <h1 style="margin:0 0 20px 0; font-size:22px; color:${colors.foreground};">Hello ${userName || 'User'},</h1>
            
            <p style="margin:0 0 20px 0; font-size:16px; line-height:1.6;">
              We are writing to inform you that your <strong>Sasya Marg</strong> account has been <strong>suspended</strong> effective immediately.
            </p>

            <div style="background-color: #fff7ed; border: 1px solid #ffedd5; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
              <p style="margin:0 0 8px 0; font-size:13px; font-weight: bold; color:${colors.destructive}; text-transform: uppercase;">Reason for Suspension:</p>
              <p style="margin:0; font-size:15px; line-height:1.5; color:${colors.foreground};">
                ${reason || 'Violation of our Terms of Service or community guidelines.'}
              </p>
            </div>

            <p style="margin:0 0 20px 0; font-size:15px; line-height:1.6; color:${colors.muted};">
              While your account is suspended, you will not be able to log in, access your farm data, or interact with the marketplace. If you believe this was a mistake or would like to appeal this decision, please contact our administrative team.
            </p>

            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 30px;">
              <tr>
                <td align="center">
                  <a href="mailto:${supportEmail || 'support@sasyamarg.com'}" style="display:inline-block; padding:14px 30px; border: 2px solid ${colors.destructive}; color:${colors.destructive}; text-decoration:none; font-size:15px; border-radius:6px; font-weight:700;">
                    Contact Support Team
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td align="center" style="background-color: ${colors.foreground}; padding: 30px;">
            <p style="margin:0 0 10px 0; font-size:12px; color:${colors.white};">
              Sasya Marg — Agri-Intelligence Platform
            </p>
            <p style="margin:0; font-size:11px; color:${colors.white}; opacity: 0.6;">
              This is a system-generated notification regarding your account status.
            </p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>

</body>
</html>`;
};


export const campaignEmailTemplate = ({ userName, title, message, subject, redirectUrl, websiteUrl }) => {
  const colors = {
    background: "#fafaf9", // Pale Cream
    foreground: "#364219", // Deep Moss
    primary: "#5c6f2b",    // Olive
    accent: "#eab308",     // Sun Yellow
    muted: "#6b7750",      // Lighter Moss
    border: "#d6dbc8",     // Soft border
    white: "#ffffff"
  };

  const logoUrl = "https://res.cloudinary.com/dq0ltmja4/image/upload/v1772435826/sasyamarg_logo_wtzjzu.png";

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${subject || 'Important Update - Sasya Marg'}</title>
</head>
<body style="margin:0; padding:0; background-color:${colors.background}; font-family: 'Inter', -apple-system, sans-serif; color: ${colors.foreground};">

<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${colors.background}; padding: 40px 10px;">
  <tr>
    <td align="center">
      <table width="600" cellpadding="0" cellspacing="0" border="0" style="background:${colors.white}; border: 1px solid ${colors.border}; border-radius:12px; overflow:hidden; box-shadow: 0 4px 15px rgba(54,66,25,0.05);">
        
        <tr>
          <td align="center" style="padding: 30px 20px; border-bottom: 1px solid ${colors.background};">
            <img src="${logoUrl}" alt="Sasya Marg Logo" width="150" style="display: block;">
          </td>
        </tr>

        <tr>
          <td align="center" style="background-color: ${colors.primary}; padding: 12px; color: ${colors.white}; font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">
            Platform Announcement
          </td>
        </tr>

        <tr>
          <td style="padding: 40px;">
            <h1 style="margin:0 0 10px 0; font-size:22px; color:${colors.foreground}; text-align: left;">Hello ${userName || 'User'},</h1>
            <h2 style="margin:0 0 20px 0; font-size:18px; color:${colors.primary}; line-height:1.4;">${title || 'Important Update for You'}</h2>
            
            <p style="margin:0 0 25px 0; font-size:16px; line-height:1.7; color: #4a5568;">
              ${message || 'We have some interesting updates for you regarding our platform and your activities.'}
            </p>

            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 20px;">
              <tr>
                <td align="center">
                  <a href="${redirectUrl || websiteUrl || '#'}" style="display:inline-block; padding:15px 35px; background-color: ${colors.accent}; color:${colors.foreground}; text-decoration:none; font-size:16px; border-radius:8px; font-weight:800; border: 1px solid #d9a306;">
                    View Details
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td align="center" style="padding: 0 40px 30px 40px;">
            <p style="margin:0; font-size:14px; color:${colors.muted}; line-height:1.5;">
              If you have any questions, feel free to visit our <a href="${websiteUrl}" style="color:${colors.primary}; text-decoration:none; font-weight:600;">website</a> or contact our support team.
            </p>
          </td>
        </tr>

        <tr>
          <td align="center" style="background-color: ${colors.foreground}; padding: 30px;">
            <p style="margin:0 0 10px 0; font-size:12px; color:${colors.white}; font-weight: 600;">
              Sasya Marg — Empowering Agriculture through Intelligence
            </p>
            <p style="margin:0; font-size:11px; color:${colors.white}; opacity: 0.6;">
              &copy; 2026 Sasya Marg. All Rights Reserved.
            </p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>

</body>
</html>`;
};