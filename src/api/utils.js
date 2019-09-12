export function getOptions(searchFilter, currentData) {
  const { jenjang, tahun, jurusan } = searchFilter;

  const options = {};
  options.jenjang = mapKeysToOptions(currentData);

  const currentJenjang = currentData && currentData[jenjang];
  options.tahun = jenjang ? mapKeysToOptions(currentJenjang) : [];

  const currentTahun = currentJenjang && currentJenjang[tahun];
  options.jurusan = tahun ? mapKeysToOptions(currentTahun) : [];

  const currentJurusan = currentTahun && currentTahun[jurusan];
  options.mataUjian = jurusan ? mapKeysToOptions(currentJurusan) : [];
  return options;
}

export function mapKeysToOptions(obj) {
  return Object.keys(obj).map(val => ({
    label: val,
    value: val
  }));
}
