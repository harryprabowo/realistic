export function getOptions(searchFilter, currentData) {
  const { jenjang, tahun, wilayah, jurusan } = searchFilter;

  const options = {};
  options.jenjang = mapKeysToOptions(currentData);

  const currentJenjang = currentData && currentData[jenjang];
  options.tahun = jenjang ? mapKeysToOptions(currentJenjang) : [];

  const currentTahun = currentJenjang && currentJenjang[tahun];
  options.wilayah = tahun ? mapKeysToOptions(currentTahun) : [];

  const currentWilayah = currentTahun && currentTahun[wilayah];
  options.jurusan = wilayah ? mapKeysToOptions(currentWilayah) : [];

  const currentJurusan = currentWilayah && currentWilayah[jurusan];
  options.mataUjian = jurusan ? mapKeysToOptions(currentJurusan) : [];
  return options;
}

export function mapKeysToOptions(obj) {
  return Object.keys(obj).map(val => ({
    label: val,
    value: val
  }));
}
