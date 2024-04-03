import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {LineChart} from 'react-native-chart-kit';
import Swiper, {SwiperFlatList} from 'react-native-swiper';

const screenWidth = Dimensions.get('window').width;
const dominantColor = '#800080';
const NewsScreen = ({navigation}) => {
  const data = {
    labels: [
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember',
    ],
    datasets: [
      {
        data: [10, 20, 45, 28, 80, 50, 43, 50, 70, 40, 54, 65],
      },
    ],
  };

  const chartConfig = {
    backgroundColor: '#fff',
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(128, 0, 128, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(128, 0, 128, ${opacity})`,
    propsForDots: {
      r: '5',
      strokeWidth: '3',
      stroke: '#800080',
    },
  };
  const navigateTo = screen => {
    navigation.navigate(screen);
  };

  const handleWhatsAppCheckout = async () => {
    const whatsappMessage = `Halo saya ingin berdonasi`;

    Linking.openURL(
      `whatsapp://send?phone=+62814-1302-9816&text=${whatsappMessage}`,
    );

    // Navigate to History screen, passing the new order
    // navigation.navigate('History', {newOrder});
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{padding: 16}}>
          <Text style={styles.title}>Makanan Terselamatkan</Text>
        </View>
        <Swiper style={{maxHeight: 400}}>
          <LineChart
            data={data}
            width={screenWidth}
            height={400}
            chartConfig={chartConfig}
            verticalLabelRotation={90}
            withInnerLines={false}
            getDotColor={() => '#fff'}
            fromZero
            bezier
          />
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={styles.title}>199.650 </Text>
            <Text>Total makanan terselamatkan</Text>
            <Text style={styles.title}>Rp. 1,808,051,032</Text>
            <Text>Total kerugian berhasil dicegah</Text>
            <Text style={styles.title}>3.252.336 kgCO₂e</Text>
            <Text>Total yang berhasil dicegah</Text>
          </View>
        </Swiper>
        <View style={{padding: 16}}>
          {/* <Text style={styles.subtitle}>Definisi dan Rantai Pasok Makanan</Text> */}
          <Text style={styles.title}>Tentang Aplikasi</Text>
          <Text style={styles.paragraph}>
            Melansir data dari FAO, jumlah limbah makanan di Indonesia mencapai
            13 juta ton per tahun. Meski termasuk dalam sampah mudah terurai,
            sampah makanan bila tidak dikelola dengan baik dapat merusak
            lingkungan. Pengolahan sampah merupakan bagian penting dalam
            penanganan sampah untuk merubah sampah menjadi bentuk yang lebih
            stabil dan tidak mencemari lingkungan serta mengurangi jumlah sampah
            yang harus ditimbun di TPA (Tempat Pemrosesan Akhir). Sampah makanan
            merupakan jenis sampah terbanyak yang dihasilkan oleh masyarakat
            Indonesia, menurut data dari Kementerian Lingkungan Hidup dan
            Kehutanan pada 2020. Persentase sampah makanan mencapai 39,8 persen
            dari totalan sampah yang ada. Sementara itu, diperkirakan sebanyak
            8,34 persen masyarakat Indonesia masih kekurangan makanan. Dengan
            demikian, perlu upaya untuk mengurangi sampah makanan tersebut.
            Aplikasi WaniObah hadir sebagai salah satu bentuk perubahan yang
            mengajak masyarakat untuk berani bergerak dan mengambil peran dalam
            mengatasi permasalahan food waste dan mencapai responsible
            consumption and production. Dengan adanya aplikasi Wani Obah
            harapannya akan mampu mengubah pola pikir masyarakat terhadap food
            waste dan food loss. Lebih dari itu, aplikasi Wani Obah akan
            membantu masyarakat prasejahtera dalam mendapatkan makanan layak
            dengan harga murah. Sehingga aplikasi ini akan mampu membantu
            pemerintah Kota Salatiga dalam mendorong terciptanya lingkungan yang
            lebih berkelanjutan.
          </Text>
          <Text style={styles.title}>
            Tanggap Pengelolaan Sampah Makanan Bersama Wani Obah
          </Text>
          <Text style={styles.subtitle}>1. Komposting:</Text>
          <Text style={styles.paragraph}>
            Mengubah sisa-sisa makanan menjadi pupuk organik dengan cara
            komposting. Ini dapat dilakukan di tingkat rumah tangga atau dalam
            skala yang lebih besar oleh pemerintah atau organisasi.
          </Text>
          <Text style={styles.subtitle}>2. Pengumpulan Sampah Organik:</Text>
          <Text style={styles.paragraph}>
            Memisahkan sampah organik dari sampah non-organik di rumah tangga
            atau tempat-tempat umum untuk memfasilitasi pengolahan lebih lanjut.
          </Text>
          <Text style={styles.subtitle}>3. Donasi Makanan:</Text>
          <Text style={styles.paragraph}>
            Mendorong kebijakan donasi makanan yang aman dan bertanggung jawab
            untuk mengurangi pemborosan makanan dan membantu mereka yang
            membutuhkan.
          </Text>
          <Text style={styles.subtitle}>
            4. Penggunaan Aplikasi Anti-Pemborosan Makanan:
          </Text>
          <Text style={styles.paragraph}>
            Memanfaatkan aplikasi yang menghubungkan produsen makanan dengan
            konsumen atau organisasi amal untuk mengurangi pemborosan makanan.
          </Text>
          <Text style={styles.subtitle}>5. Edukasi Masyarakat:</Text>
          <Text style={styles.paragraph}>
            Memberikan edukasi kepada masyarakat tentang pentingnya mengelola
            sampah makanan, termasuk praktik membeli sesuai kebutuhan, menyimpan
            dengan benar, dan menggunakan kembali sisa makanan.
          </Text>
          <Text style={styles.subtitle}>
            6. Implementasi Program Daur Ulang:
          </Text>
          <Text style={styles.paragraph}>
            Mendorong program daur ulang yang efektif untuk kemasan makanan dan
            bahan-bahan lainnya untuk mengurangi limbah sampah.
          </Text>
          <Text style={styles.subtitle}>7. Kampanye Zero Waste:</Text>
          <Text style={styles.paragraph}>
            Mendorong konsep zero waste dengan mengurangi produksi sampah
            makanan melalui pengurangan pembelian berlebihan dan pemanfaatan
            kembali sisa makanan.
          </Text>
          <Text style={styles.subtitle}>8. Pengolahan Energi:</Text>
          <Text style={styles.paragraph}>
            Menggunakan teknologi untuk mengubah sampah makanan menjadi sumber
            energi, seperti biogas atau produksi listrik melalui pembangkit
            listrik tenaga biomassa.
          </Text>
          <Text style={styles.subtitle}>9. Peran Pemerintah:</Text>
          <Text style={styles.paragraph}>
            Menyusun kebijakan yang mendukung pengelolaan sampah makanan,
            termasuk regulasi terkait donasi makanan, pengumpulan sampah
            organik, dan insentif bagi pelaku usaha yang berpartisipasi.
          </Text>
          <Text style={styles.subtitle}>10. Penelitian dan Inovasi:</Text>
          <Text style={styles.paragraph}>
            Mendorong penelitian dan inovasi dalam pengembangan teknologi yang
            lebih efisien dalam mengelola sampah makanan, seperti metode
            pengeringan atau pengawetan yang ramah lingkungan.
          </Text>
          <Text style={styles.subtitle}>
            Aktivitas anda bersama Wani Obah mendukung program Salatiga BERIMAN
            Donasi anda, membantu gerak Wani Obah. Klik donasi
          </Text>
          <TouchableOpacity
            style={[styles.checkoutButton, {backgroundColor: dominantColor}]}
            onPress={handleWhatsAppCheckout}>
            <Text style={styles.checkoutButtonText}>Donasi</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigateTo('Home')}>
          <Icon name="home" size={20} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigateTo('History')}>
          <Icon name="history" size={20} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigateTo('News')}>
          <Icon name="newspaper-o" size={20} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigateTo('Compost')}>
          <Icon name="tree" size={20} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigateTo('Account')}>
          <Icon name="user" size={20} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  checkoutButton: {
    backgroundColor: dominantColor,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: dominantColor,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color: dominantColor,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
    marginBottom: 10,
    color: '#000',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    borderTopWidth: 1, // Optional: Add a border at the top of the footer
    borderTopColor: '#ccc', // Optional: Border color
  },
  footerButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
});

export default NewsScreen;
