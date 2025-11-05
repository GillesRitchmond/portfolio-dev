import { SITE_CONFIG } from '@/lib/constants';
import { EmailData } from '@/lib/types';
import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';

// const baseUrl = process.env.VERCEL_URL
//   ? `https://${process.env.VERCEL_URL}`
//   : '';


const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
};

const box = {
  padding: '0 48px',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};

const paragraph = {
  color: '#525f7f',
  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'left' as const,
};

const paragraphRight = {
  color: '#525f7f',
  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'right' as const,
};

const anchor = {
  color: '#556cd6',
};

const button = {
  backgroundColor: '#656ee8',
  borderRadius: '5px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '10px',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
};


export function ContactEmail({ name, email, subject, message }: EmailData) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Preview>You're now ready to make live transactions with Stripe!</Preview>
        <Container style={container}>
          <Section style={box}>
            <Text style={paragraph}>
              Bonjour {SITE_CONFIG.name}
            </Text>
            <Text style={paragraph}>
              Vous avez reçu une nouvelle demande de contact
            </Text>
            <Hr style={hr} />
            <table>
              <tbody>
                <tr>
                  <td style={paragraph}>
                    <b>Nom :</b>
                  </td>
                  <td style={paragraphRight}>
                    {name}
                  </td>
                </tr>
                <tr>
                  <td style={paragraph}>
                    <b>Email :</b>
                  </td>
                  <td style={paragraphRight}>
                    {email}
                  </td>
                </tr>
                <tr>
                  <td style={paragraph}>
                    <b>Sujet :</b>
                  </td>
                  <td style={paragraphRight}>
                    {subject}
                  </td>
                </tr>
              </tbody>
            </table>
            <Hr style={hr} />
            <Text style={paragraph}>
              <b>Message :</b>
            </Text>
            <Text style={paragraphRight}>
              {message}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}