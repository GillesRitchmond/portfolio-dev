import { SITE_CONFIG } from '@/lib/constants';
import { EmailData } from '@/lib/types';
import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';

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
                  <td style={paragraph}>
                    {name}
                  </td>
                </tr>
                <tr>
                  <td style={paragraph}>
                    <b>Email :</b>
                  </td>
                  <td style={paragraph}>
                    {email}
                  </td>
                </tr>
                <tr>
                  <td style={paragraph}>
                    <b>Sujet :</b>
                  </td>
                  <td style={paragraph}>
                    {subject}
                  </td>
                </tr>
              </tbody>
            </table>
            <Hr style={hr} />
            <Text style={paragraph}>
              <b>Message :</b>
            </Text>
            <Text style={paragraph}>
              {message}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}