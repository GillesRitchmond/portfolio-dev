import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from "@react-pdf/renderer"
import { RESUME_DATA } from "@/lib/resume-data"

const colors = {
  primary: "#171717",
  secondary: "#525252",
  accent: "#2563eb",
  muted: "#737373",
  border: "#e5e5e5",
  background: "#ffffff",
  lightBg: "#f5f5f5",
}

const styles = StyleSheet.create({
  page: {
    padding: 36,
    fontSize: 9.5,
    fontFamily: "Helvetica",
    color: colors.primary,
    backgroundColor: colors.background,
  },
  // Header
  header: {
    marginBottom: 20,
    borderBottom: `2px solid ${colors.accent}`,
    paddingBottom: 14,
  },
  name: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    color: colors.primary,
    marginBottom: 4,
  },
  title: {
    fontSize: 11,
    color: colors.accent,
    marginBottom: 10,
    fontFamily: "Helvetica-Bold",
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  contactItem: {
    fontSize: 8.5,
    color: colors.secondary,
  },
  contactLink: {
    fontSize: 8.5,
    color: colors.accent,
    textDecoration: "none",
  },
  // Sections
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: colors.accent,
    marginBottom: 10,
    paddingBottom: 3,
    borderBottom: `1px solid ${colors.border}`,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  // Experience
  experienceItem: {
    marginBottom: 12,
  },
  experienceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  experienceTitle: {
    fontSize: 10.5,
    fontFamily: "Helvetica-Bold",
    color: colors.primary,
  },
  experiencePeriod: {
    fontSize: 8.5,
    color: colors.muted,
  },
  experienceCompany: {
    fontSize: 9.5,
    color: colors.accent,
    marginBottom: 4,
  },
  experienceDescription: {
    fontSize: 9,
    color: colors.secondary,
    marginBottom: 4,
    lineHeight: 1.4,
  },
  taskItem: {
    flexDirection: "row",
    marginBottom: 2,
    paddingLeft: 8,
  },
  taskBullet: {
    fontSize: 9,
    color: colors.accent,
    marginRight: 6,
    width: 8,
  },
  taskText: {
    fontSize: 8.5,
    color: colors.secondary,
    flex: 1,
    lineHeight: 1.4,
  },
  techRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
    marginTop: 6,
  },
  techBadge: {
    backgroundColor: colors.lightBg,
    padding: "2 6",
    borderRadius: 3,
    fontSize: 7.5,
    color: colors.secondary,
  },
  // Education
  educationItem: {
    marginBottom: 10,
  },
  educationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  educationDegree: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: colors.primary,
  },
  educationSchool: {
    fontSize: 9,
    color: colors.accent,
    marginBottom: 2,
  },
  educationPeriod: {
    fontSize: 8.5,
    color: colors.muted,
  },
  educationDescription: {
    fontSize: 8.5,
    color: colors.secondary,
    lineHeight: 1.4,
  },
  // Skills
  skillsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  skillCategory: {
    width: "48%",
    marginBottom: 8,
  },
  skillCategoryName: {
    fontSize: 9.5,
    fontFamily: "Helvetica-Bold",
    color: colors.primary,
    marginBottom: 4,
  },
  skillsList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 3,
  },
  skillBadge: {
    backgroundColor: colors.lightBg,
    padding: "2 6",
    borderRadius: 3,
    fontSize: 8,
    color: colors.secondary,
  },
  // Languages
  languagesRow: {
    flexDirection: "row",
    gap: 20,
  },
  languageItem: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  languageName: {
    fontSize: 9.5,
    fontFamily: "Helvetica-Bold",
    color: colors.primary,
  },
  languageLevel: {
    fontSize: 8.5,
    color: colors.muted,
  },
  // Two columns layout
  twoColumns: {
    flexDirection: "row",
    gap: 20,
  },
  mainColumn: {
    flex: 1,
  },
  sideColumn: {
    width: "35%",
  },
  // Footer
  footer: {
    position: "absolute",
    bottom: 20,
    left: 36,
    right: 36,
    textAlign: "center",
    fontSize: 7.5,
    color: colors.muted,
    borderTop: `1px solid ${colors.border}`,
    paddingTop: 8,
  },
})

export function ResumePDF() {
  const { personalInfo, experiences, education, languages, skills } = RESUME_DATA

  return (
    <Document
      title={`${personalInfo.name} - CV`}
      author={personalInfo.name}
      subject="Curriculum Vitae"
    >
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{personalInfo.name}</Text>
          <Text style={styles.title}>{personalInfo.title}</Text>
          <View style={styles.contactRow}>
            <Text style={styles.contactItem}>{personalInfo.email}</Text>
            <Text style={styles.contactItem}>|</Text>
            <Text style={styles.contactItem}>{personalInfo.location}</Text>
            <Text style={styles.contactItem}>|</Text>
            <Link src={personalInfo.linkedin} style={styles.contactLink}>
              LinkedIn
            </Link>
            <Text style={styles.contactItem}>|</Text>
            <Link src={personalInfo.github} style={styles.contactLink}>
              GitHub
            </Link>
            <Text style={styles.contactItem}>|</Text>
            <Link src={personalInfo.website} style={styles.contactLink}>
              Portfolio
            </Link>
          </View>
        </View>

        {/* Two Column Layout */}
        <View style={styles.twoColumns}>
          {/* Main Column */}
          <View style={styles.mainColumn}>
            {/* Expériences */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Expériences professionnelles</Text>
              {experiences.map((exp, index) => (
                <View key={index} style={styles.experienceItem}>
                  <View style={styles.experienceHeader}>
                    <Text style={styles.experienceTitle}>{exp.title}</Text>
                    <Text style={styles.experiencePeriod}>{exp.period}</Text>
                  </View>
                  <Text style={styles.experienceCompany}>
                    {exp.company} — {exp.location}
                  </Text>
                  <Text style={styles.experienceDescription}>{exp.description}</Text>
                  {exp.tasks.map((task, i) => (
                    <View key={i} style={styles.taskItem}>
                      <Text style={styles.taskBullet}>•</Text>
                      <Text style={styles.taskText}>{task}</Text>
                    </View>
                  ))}
                  <View style={styles.techRow}>
                    {exp.technologies.map((tech, i) => (
                      <Text key={i} style={styles.techBadge}>
                        {tech}
                      </Text>
                    ))}
                  </View>
                </View>
              ))}
            </View>

            {/* Formation */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Formation</Text>
              {education.map((edu, index) => (
                <View key={index} style={styles.educationItem}>
                  <View style={styles.educationHeader}>
                    <Text style={styles.educationDegree}>{edu.degree}</Text>
                    <Text style={styles.educationPeriod}>{edu.period}</Text>
                  </View>
                  <Text style={styles.educationSchool}>
                    {edu.school} — {edu.location}
                  </Text>
                  {edu.description && (
                    <Text style={styles.educationDescription}>{edu.description}</Text>
                  )}
                </View>
              ))}
            </View>
          </View>

          {/* Side Column */}
          <View style={styles.sideColumn}>
            {/* Compétences */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Compétences</Text>
              {skills.map((category) => (
                <View key={category.name} style={{ marginBottom: 8 }}>
                  <Text style={styles.skillCategoryName}>{category.name}</Text>
                  <View style={styles.skillsList}>
                    {category.skills.map((skill, i) => (
                      <Text key={i} style={styles.skillBadge}>
                        {skill}
                      </Text>
                    ))}
                  </View>
                </View>
              ))}
            </View>

            {/* Langues */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Langues</Text>
              {languages.map((lang) => (
                <View key={lang.name} style={{ marginBottom: 6 }}>
                  <Text style={styles.languageName}>
                    {lang.flag} {lang.name}
                  </Text>
                  <Text style={styles.languageLevel}>{lang.level}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          CV généré depuis {personalInfo.website} — Dernière mise à jour :{" "}
          {new Date().toLocaleDateString("fr-FR", {
            month: "long",
            year: "numeric",
          })}
        </Text>
      </Page>
    </Document>
  )
}
