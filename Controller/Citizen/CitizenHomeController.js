import { fetchData } from "../FetchAPIs/coomonFetch";
import Constants from "../../Constants/Strings";

export const fetchHealthTips = async () => {
  try {
    const tips = await fetchData(Constants.collectionName.healthTips);
    return tips;
  } catch (error) {
    console.error("Error fetchHealthTips tips:", error);
  } finally {
  }
};
