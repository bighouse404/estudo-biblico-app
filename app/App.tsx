import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.background}>
      <StatusBar style="light" />

      <View style={styles.card}>
        {/* Badge de Status */}
        <View style={styles.badge}>
          <Text style={styles.badgeText}>EM CONSTRUÇÃO</Text>
        </View>

        {/* Título Principal */}
        <Text style={styles.icon}>📖</Text>
        <Text style={styles.title}>Estudo Bíblico App</Text>

        {/* Versículo / Subtítulo */}
        <Text style={styles.verse}>
          “Lâmpada para os meus pés é a tua palavra e luz, para o meu caminho.”
        </Text>
        <Text style={styles.verseRef}>Salmos 119:105</Text>

        <View style={styles.divider} />

        {/* Rodapé técnico do MVP */}
        <Text style={styles.footerText}>
          Frontend Expo (React Native & Web) conectado a .NET Web API
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#0f172a", // Slate escuro elegante
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 480, // Mantém a proporção de app no navegador do computador
    backgroundColor: "#1e293b",
    borderRadius: 16,
    padding: 32,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#334155",
  },
  badge: {
    backgroundColor: "rgba(217, 119, 6, 0.2)",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 100,
    marginBottom: 20,
  },
  badgeText: {
    color: "#f59e0b",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
  },
  icon: {
    fontSize: 48,
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#f8fafc",
    marginBottom: 16,
  },
  verse: {
    fontSize: 16,
    lineHeight: 24,
    fontStyle: "italic",
    textAlign: "center",
    color: "#94a3b8",
    marginBottom: 8,
  },
  verseRef: {
    fontSize: 13,
    fontWeight: "600",
    color: "#cbd5e1",
    marginBottom: 24,
  },
  divider: {
    width: 60,
    height: 1,
    backgroundColor: "#334155",
    marginBottom: 20,
  },
  footerText: {
    fontSize: 12,
    color: "#64748b",
    textAlign: "center",
  },
});
