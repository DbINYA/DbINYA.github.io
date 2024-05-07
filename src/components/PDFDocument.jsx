import { React } from "react";
import { Document, Page, Text, View, StyleSheet, Image, PDFDownloadLink } from '@react-pdf/renderer';


const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#fdfff5',
  },
  viewer: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
  section: {
    margin: 5,
    padding: 5,
    flexGrow: 1,
  },
});

// Create Document Component
const MyDocument = ({ name, surname, picture }) => (
  <Document>
  <Page size="A4" style={styles.page}>
    <View style={styles.section}>
      <Text>{name}</Text>
    </View>
    <View style={styles.section}>
      <Text>{surname}</Text>
    </View>
    <View style={styles.section}>
      {picture && <Image src={URL.createObjectURL(picture)} style={{ width: '100px', height: '100px' }} />}
    </View>
  </Page>
</Document>
);


const Exporter = ({name, surname, picture}) => {
  return (
      <PDFDownloadLink
        document={<MyDocument name={name} surname={surname} picture={picture} />}
        fileName="example.pdf"
        style={{
            textDecoration: "none",
            padding: "5px 15px",
            color: "teal",
            fontSize: "14px",
            background: "transparent",
            border: "1px solid teal",
            cursor: "pointer",
            marginTop: "20px"
          }}
      >
        {({ loading }) =>
          loading ? "Документ загружается..." : "Скачать PDF"
        }
      </PDFDownloadLink>
    )
}

export default Exporter;