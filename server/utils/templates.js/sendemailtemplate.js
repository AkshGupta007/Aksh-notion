// MyEmailTemplate.jsx
const MyEmailTemplate = ({ body }) => (
  <html>
    <head>
      <meta charSet="UTF-8" />
      <title>Email Template</title>
    </head>
    <body
      style={{
        margin: 0,
        padding: 0,
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f4f4f4",
      }}
    >
      <table
        role="presentation"
        width="100%"
        cellSpacing="0"
        cellPadding="0"
        border="0"
      >
        <tbody>
          <tr>
            <td align="center" style={{ padding: "20px 0" }}>
              <table
                role="presentation"
                width="600"
                cellSpacing="0"
                cellPadding="0"
                border="0"
                style={{
                  background: "#ffffff",
                  borderRadius: "8px",
                  overflow: "hidden",
                }}
              >
                <tbody>
                  <tr>
                    <td
                      style={{
                        background: "#ffcc00",
                        padding: "20px",
                        textAlign: "center",
                        fontSize: "24px",
                        fontWeight: "bold",
                        color: "#000",
                      }}
                    >
                      Your Company
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "30px",
                        color: "#333",
                        fontSize: "16px",
                        lineHeight: "1.5",
                      }}
                    >
                      <p>
                        <strong>Hello,</strong>
                      </p>
                      <p>{body}</p>
                      <p>
                        Regards,
                        <br />
                        The Team
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        background: "#eee",
                        padding: "15px",
                        textAlign: "center",
                        fontSize: "12px",
                        color: "#666",
                      }}
                    >
                      © 2026 Your Company. All rights reserved.
                      <br />
                      <a
                        href="https://yourcompany.com"
                        style={{ color: "#000", textDecoration: "none" }}
                      >
                        Visit our website
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </body>
  </html>
);

module.exports = MyEmailTemplate;
