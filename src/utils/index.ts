const formatPrice = (price: number): string => {
  if (price >= 1000) {
    return `$${(price / 1000).toFixed(2)}K`;
  } else {
    return `$${price.toFixed(2)}`;
  }
};

const formatPriceV2 = (price: number): string => {
  return price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const formatBillion = (value: number): string => {
  if (value >= 1000000000) {
    return `${(value / 1000000000).toFixed(2)}B`;
  } else if (value >= 1000000) {
    return `${(value / 1000000).toFixed(2)}M`;
  } else {
    return `${value}`;
  }
};

const limitLength = (value: any, maxLength: number) => {
  const valueStr = value.toString();
  if (valueStr.length > maxLength) {
    return value.slice(0, maxLength);
  }
  return value;
};

const sortData = (data: any, type: string) => {
  const sorted = data ? [...data] : [];
  switch (type) {
    case "name":
      //sort by alphabet
      sorted.sort((a: { name: string }, b: { name: string }) =>
        a.name.localeCompare(b.name)
      );
      break;
    case "price":
      //sort by price
      sorted.sort(
        (a: { price: number }, b: { price: number }) => a.price - b.price
      );
      break;
    case "change":
      //sort by price change
      sorted.sort(
        (a: { priceChange1h: number }, b: { priceChange1h: number }) =>
          a.priceChange1h - b.priceChange1h
      );
      break;
    case "1dvolume":
      //sort by 24h volume
      sorted.sort(
        (a: { volume: number }, b: { volume: number }) => a.volume - b.volume
      );
      break;
    case "marketCap":
      //sort by market cap
      sorted.sort(
        (a: { marketCap: number }, b: { marketCap: number }) =>
          a.marketCap - b.marketCap
      );
      break;
  }
  return sorted;
};

const ConvertTimeStampsToDate = (timeStamps: number) => {
  return new Date(timeStamps * 1000).toLocaleDateString("vi-VN");
};

export {
  formatPrice,
  formatPriceV2,
  formatBillion,
  limitLength,
  sortData,
  ConvertTimeStampsToDate,
};
