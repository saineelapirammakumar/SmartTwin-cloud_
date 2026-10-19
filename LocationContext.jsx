// Remembers which district / city / zone the user picked, so every page uses the same filter.
import { createContext, useContext, useMemo, useState } from "react";

const LocationCtx = createContext(null);

export function LocationProvider({ children }) {
  const [districtId, setDistrictId] = useState("");
  const [cityId, setCityId] = useState("");
  const [zoneId, setZoneId] = useState("");
  const [version, setVersion] = useState(0); // increase to make location lists reload

  const value = useMemo(
    () => ({
      districtId, cityId, zoneId, version,
      selectDistrict: (id) => { setDistrictId(id); setCityId(""); setZoneId(""); },
      selectCity: (id) => { setCityId(id); setZoneId(""); },
      selectZone: (id) => setZoneId(id),
      clear: () => { setDistrictId(""); setCityId(""); setZoneId(""); },
      bump: () => setVersion((v) => v + 1),
      params: { district_id: districtId, city_id: cityId, zone_id: zoneId },
    }),
    [districtId, cityId, zoneId, version]
  );
  return <LocationCtx.Provider value={value}>{children}</LocationCtx.Provider>;
}

export function useLoc() {
  return useContext(LocationCtx);
}
