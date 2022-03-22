import axios from 'axios';

export const search = async (query: string) => {
  try {
    const apiResponse = await axios.get(`/api/public/users/search?query=${query}`)
    return { success: true, data: apiResponse.data}
  } catch (err) {
    return { success: false, data: err}
  }
};

export const filter = (results: any, filters: any) => {
  if (filters.orderBy == "DEF") {
    results = [...results.sort((user1: any, _: any) => (user1.isPremium ? -1 : 1))]
  }
  if (filters.orderBy == "PUN") {
    results = [...results.sort((user1: any, user2: any) => (avgRating(user1) < avgRating(user2) ? 1 : -1))]
  }
  if (filters.location && Object.keys(filters.location).length > 0) {
    results = [...results.filter((user: any) => isWithinRange(user, filters.location))]
  }
  if (filters.rating && filters.rating.length > 0) {
    results = [...results.filter((user: any) => (avgRating(user) >= filters.rating[0] && avgRating(user) <= filters.rating[1] ))]
  }
  return results;
};

function avgRating(user: any) {
  let sum: number = 0;
  if (user.rating?.length > 0) {
    user.rating.forEach((r: any) => r.score ? sum += +r.score : null)
    return sum/user.rating.length;
  }
  return 0;
}

function isWithinRange(user: any, location: any) {
  return distance({
    lat1: location.lat,
    lon1: location.lng,
    lat2: user.address.lat ? user.address.lat : 0,
    lon2: user.address.lng ? user.address.lng : 0,
    unit: "K",
  }) < location.range
}

type Props = {
  lat1: number;
  lon1: number;
  lat2: number;
  lon2: number;
  unit: string;
};

function distance({ lat1, lon1, lat2, lon2, unit }: Props) {
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