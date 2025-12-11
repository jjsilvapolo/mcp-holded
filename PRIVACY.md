# Privacy Policy

**Last Updated**: December 11, 2025

This Privacy Policy describes how the MCP Holded server ("the Server", "we", "our") handles data when you use it to connect your AI assistant to the Holded Invoice API.

## 1. Overview

The MCP Holded server is an open-source Model Context Protocol (MCP) server that acts as a bridge between AI assistants (like Claude) and the Holded Invoice API. This server runs locally on your machine and does not operate any cloud services or remote servers that process your data.

## 2. Data Collection

### 2.1 What Data We Collect

The Server requires and processes the following data:

- **Holded API Key**: Your personal API key from Holded, provided via the `HOLDED_API_KEY` environment variable
- **API Request Data**: Data you or your AI assistant send through the Server to interact with Holded (e.g., invoice details, contact information, product data)
- **API Response Data**: Data returned from the Holded API in response to your requests

### 2.2 How Data is Collected

- The API key is read from your local environment variables when the Server starts
- Request and response data flows through the Server during runtime as you interact with your AI assistant
- No data is collected, transmitted, or stored beyond the immediate request-response cycle

## 3. Data Usage

### 3.1 How We Use Your Data

Your data is used exclusively for the following purposes:

- **API Authentication**: Your Holded API key authenticates requests to the Holded API
- **Request Proxying**: The Server forwards your requests to the appropriate Holded API endpoints
- **Response Delivery**: API responses are returned to your AI assistant for processing and presentation

### 3.2 What We Don't Do With Your Data

The Server does NOT:

- Store your API key or any request/response data persistently
- Log API requests, responses, or your API key to disk
- Analyze, profile, or perform any secondary processing on your data
- Use your data for training, analytics, or improvement purposes
- Transmit your data to any servers or services operated by the maintainers of this project

## 4. Data Storage and Retention

### 4.1 No Persistent Storage

The Server does not store any data persistently. All data exists only in memory during the runtime of each request and is immediately discarded after the response is delivered.

### 4.2 Temporary Memory Usage

During request processing:

- Your API key is held in memory for the lifetime of the Server process
- Request and response data exists in memory only for the duration of each individual API call (typically milliseconds to seconds)

## 5. Data Sharing and Third-Party Access

### 5.1 Holded API

Your API key and request data are transmitted to:

- **Service**: Holded Invoice API
- **Purpose**: To fulfill your requests for invoicing, contacts, products, and other Holded functionality
- **Endpoint**: https://api.holded.com/api/invoicing/v1/
- **Privacy Policy**: [Holded's Privacy Policy](https://www.holded.com/legal/privacy-policy)

The Holded API is operated by Holded and is subject to their own privacy policy and terms of service.

### 5.2 No Other Third Parties

Your data is NOT shared with:

- The maintainers or contributors of this open-source project
- Any analytics services
- Any telemetry or error reporting services
- Any other third-party services or APIs

### 5.3 AI Assistant Provider

If you use this Server with an AI assistant (e.g., Claude Desktop), the AI assistant provider may receive data according to their own privacy practices. Please review the privacy policy of your AI assistant provider:

- **Claude**: [Anthropic's Privacy Policy](https://www.anthropic.com/privacy)

## 6. Data Security

### 6.1 Transmission Security

- All communications with the Holded API use HTTPS encryption
- The Server runs locally on your machine, eliminating network exposure to untrusted parties

### 6.2 Your Responsibilities

To maintain the security of your data:

- **Never commit your API key to version control** (use environment variables only)
- **Use environment variables** for sensitive configuration
- **Regularly update** to the latest version for security patches
- **Review permissions** granted to the MCP server in your AI assistant
- **Follow the Security Policy** available at [SECURITY.md](SECURITY.md)

### 6.3 API Key Protection

Your Holded API key grants full access to your Holded account. Protect it as you would a password:

- Store it securely in environment variables
- Never share it publicly or include it in code
- Revoke and regenerate it immediately if you suspect it has been compromised
- Manage API key access through Holded's settings at: Settings > API

## 7. Open Source Transparency

This Server is open source and available at:

- **Repository**: https://github.com/iamsamuelfraga/mcp-holded
- **License**: MIT License

You can inspect the source code to verify:

- No data storage mechanisms are implemented
- No logging of sensitive data occurs
- No telemetry or analytics are collected
- All API calls go directly to Holded's official endpoints

## 8. Your Rights

### 8.1 Data Access and Control

Since the Server does not store any data:

- You have complete control over your data at all times
- Your data is never retained beyond the request-response cycle
- You can stop using the Server at any time without data removal concerns

### 8.2 Your Holded Data

For rights regarding data stored in your Holded account:

- Contact Holded directly or review their privacy policy
- Use Holded's data export and deletion features
- Manage your data through the Holded web interface

## 9. Children's Privacy

This Server is not directed to individuals under the age of 18. We do not knowingly collect or process data from children. If you become aware that a child has provided data through this Server, please contact us.

## 10. International Data Transfers

The Server runs locally on your machine. However, when you send requests to the Holded API:

- Your data is transmitted to Holded's servers (location depends on Holded's infrastructure)
- Data protection depends on Holded's policies and compliance measures
- Please review Holded's privacy policy for information about their data handling practices

## 11. Changes to This Privacy Policy

We may update this Privacy Policy from time to time. Changes will be:

- Documented in this file with an updated "Last Updated" date
- Announced in release notes for new versions
- Available in the repository's version history

Continued use of the Server after changes constitutes acceptance of the updated policy.

## 12. Legal Compliance

This Server is designed to be compliant with:

- General Data Protection Regulation (GDPR)
- California Consumer Privacy Act (CCPA)
- Other applicable data protection laws

Since we do not store or process data beyond immediate request handling, most data subject rights are not applicable. For rights related to your Holded data, contact Holded directly.

## 13. Contact Information

### 13.1 Project Maintainer

For questions about this Privacy Policy or the Server's data handling:

- **Author**: Samuel Fraga
- **GitHub**: [@iamsamuelfraga](https://github.com/iamsamuelfraga)
- **LinkedIn**: [Samuel Fraga](https://www.linkedin.com/in/samuel-fraga/)
- **Repository Issues**: https://github.com/iamsamuelfraga/mcp-holded/issues

### 13.2 Security Concerns

For security-related issues:

- Review our [Security Policy](SECURITY.md)
- Report vulnerabilities privately (do not open public issues)
- Email the maintainer directly or use GitHub's private vulnerability reporting

### 13.3 Holded-Related Data Issues

For questions about data stored in your Holded account:

- **Holded Support**: Contact through your Holded account
- **Holded Privacy**: https://www.holded.com/legal/privacy-policy

## 14. Disclaimer

This Server is provided "as is" without warranty of any kind. The maintainers are not responsible for:

- How Holded processes or stores your data
- Data breaches or security issues in Holded's systems
- Your AI assistant provider's data handling practices
- Any damages resulting from use of this Server

Use of this Server is at your own risk. You are responsible for securing your API key and reviewing the privacy policies of Holded and your AI assistant provider.

---

**MIT License Notice**: This project is licensed under the MIT License. See [LICENSE](LICENSE) for full license text.
