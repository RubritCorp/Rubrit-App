//models
import Category from "models/Category";
import ServiceRequest from "models/ServiceRequest";
//interface
//db
import "utils/db";

type Props = {
  categories: string[];
  lat: number;
  lng: number;
  RangeCoverage: number;
};

type DistanceProps = {
  lat1: any;
  lon1: any;
  lat2: any;
  lon2: any;
  unit: string;
};

function distance({ lat1, lon1, lat2, lon2, unit }: DistanceProps) {
  if (lat1 == lat2 && lon1 == lon2) {
    return 0;
  } else {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == "K") {
      dist = dist * 1.609344;
    }
    if (unit == "N") {
      dist = dist * 0.8684;
    }
    return dist;
  }
}

export default async function getNearServices({
  categories,
  lat,
  lng,
  RangeCoverage,
}: Props) {
  try {
    const options: Props = {
      categories: categories ? categories : [""],
      lat: lat ? lat : -31.4198303,
      lng: lng ? lng : -64.1903709,
      RangeCoverage: RangeCoverage ? RangeCoverage : 100,
    };

    const populateQuery = [
      {
        path: "category",
        model: "Category",
      },
      {
        path: "subcategory",
        model: "Subcategory",
      },
      {
        path: "userId",
        model: "User",
        select: "name profilePic address",
      },
    ];

    let services: any = [];

    if (categories.length) {
      const categoriesMatch = await Promise.all(
        categories.map(
          async (m: string) =>
            await ServiceRequest.findOne({ category: m }).populate(
              populateQuery
            )
        )
      );

      services = categoriesMatch.filter((f) => f !== null);

      if (services.length < 1) return [];
    } else {
      services = await ServiceRequest.find().populate(populateQuery);
    }
    console.log(services);

    const nearServices = services.filter(
      (offer: any) =>
        distance({
          lat1: options.lat,
          lon1: options.lng,
          lat2: offer.location.lat ? offer.location.lat : 0,
          lon2: offer.location.lng ? offer.location.lng : 0,
          unit: "k",
        }) < Number(options.RangeCoverage)
    );

    return nearServices;
  } catch (err) {
    console.log(err);

    return { message: "Error fetching data" };
  }
}
