// Icons
import FashionIcon from '../assets/icons/maps/point_22_fashion.svg'
import BarIcon from '../assets/icons/maps/point_22_bar.svg'
import CafeIcon from '../assets/icons/maps/point_22_cafe.svg'
import GoodsIcon from '../assets/icons/maps/point_22_goods.svg'
import RestaurantIcon from '../assets/icons/maps/point_22_restaurant.svg'
import ExhibitionIcon from '../assets/icons/maps/point_22_exhibition.svg'
import Logo from '../assets/icons/logo/paulseee_logo.png'

export default function getCategoryIcon(category) {
  let categoryIcon
  switch (category) {
    case 'bar':
      categoryIcon =
        '/static/media/point_22_bar.9075eb533419c775a719b0bba0cae22b.svg'
      break
    case 'bakery':
      categoryIcon =
        '/static/media/point_22_bakery.a059d87647b55d97dfdec611f01807a0.svg'
      break
    case 'cafe':
      categoryIcon =
        '/static/media/point_22_cafe.6a9cf6367a1a18793d10f7675a2dd6b1.svg'
      break
    case 'fashion':
      categoryIcon =
        '/static/media/point_22_fashion.a526b493bbdaff38a71dd4219bf4cea3.svg'
      break
    case 'goods':
      categoryIcon =
        '/static/media/point_22_goods.8f2c42dd76825416e6f1e949d4174b24.svg'
      break
    case 'restaurant':
      categoryIcon =
        '/static/media/point_22_restaurant.5c427a0dc4858890f49698fec4732628.svg'
      break
    default:
      categoryIcon =
        '/static/media/point_22_goods.8f2c42dd76825416e6f1e949d4174b24.svg'
  }
  return categoryIcon
}
