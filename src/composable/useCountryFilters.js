import { computed } from "vue";
import { languageCodes } from "../assets/data/languageCodes";

const useCountryFilters = ({ allCountries, filters }) => {
  const filteredCountries = computed(() => {
    let filtered = allCountries.value;

    if (filters.name.value) {
      filtered = filters.name.value;
    }

    if (filters.region.value) {
      filtered = filtered.filter(
        (country) =>
          country.subregion && country.subregion === filters.region.value
      );
    }

    if (filters.translate.value) {
      const languageNames = languageCodes.map((lang) => lang.name);

      filtered = filtered.filter((country) => {
        return (
          country.languages !== undefined &&
          languageNames.includes(Object.values(country.languages)[0]) &&
          Object.values(country.languages)[0] !== "English"
        );
      });
    }

    if (filters.carside.value) {
      filtered = filtered.filter(
        (country) => country.car.side === filters.carside.value
      );
    }

    if (filters.independent.value) {
      filtered = filtered.filter(
        (country) => country.independent === filters.independent.value
      );
    }

    return filtered;
  });

  const filteredCountriesLength = computed(
    () => filteredCountries.value.length
  );

  return { filteredCountries, filteredCountriesLength };
};

export default useCountryFilters;
