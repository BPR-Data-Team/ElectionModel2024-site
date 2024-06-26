let mapData: any = null;

export const fetchMapData = async () => {
  if (!mapData) {
    const response = await fetch("https://code.highcharts.com/mapdata/countries/us/us-all.topo.json");
    mapData = await response.json();
  }
  return mapData;
};
