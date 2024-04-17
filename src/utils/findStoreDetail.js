import { storeListDetailData } from '../assets/data/Data'

export default function findStoreDetailById(id) {
  return storeListDetailData.find((item) => item.id === id)
}
