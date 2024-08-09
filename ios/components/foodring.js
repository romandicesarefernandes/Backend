import { View, Text, StyleSheet } from 'react-native';
import PieChart from 'react-native-pie-chart';
import COLORS from '../../constants/colors';

const foodRing = ({ proteinPercentage, fatPercentage, carbPercentage }) => {

  const widthAndHeight = 100
  const series = [carbPercentage,fatPercentage,proteinPercentage]
  const sliceColor = ['#27d8ef', '#f7bf05', '#a410fe']
  return (

    <View style={{ alignItems: 'center' }}>
          <PieChart
            widthAndHeight={widthAndHeight}
            series={series}
            sliceColor={sliceColor}
            coverRadius={0.6}
            coverFill={COLORS.white}
          />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center'
  },
});
export default foodRing;

