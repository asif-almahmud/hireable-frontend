import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useGet from "../../hooks/fetch/useGet";
import styles from "./styles.module.css";

const SelectSector = ({ setSector, sectorId }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Select A Sector");
  const [sectors, setSectors] = useState([]);
  const { getRequest } = useGet();

  console.log({ sectorId });

  const getSectors = async () => {
    console.log({ sectorLoadfromInside: getSectors });
    try {
      const res = await getRequest("/sector");
      const data = res.data;

      console.log({ sectorsData: data });

      if (data) {
        setSectors(data);
      }
    } catch (err) {
      console.log({ err });
    }
  };

  let sortedOptions = [];

  for (let option of sectors) {
    placeOption(option);
  }

  function placeOption(option) {
    if (!option.parentId) {
      sortedOptions.push({ ...option, childs: [] });
      return;
    }
    if (option.parentId) {
      console.log({ sortedOptions });
      findParent(option, option.parentId, sortedOptions);
    }
  }

  function findParent(option, parentId, options) {
    console.log({ options });
    if (options) {
      for (let x of options) {
        if (parentId === x._id) {
          x.childs?.push({ ...option, childs: [] });
          return;
        } else {
          findParent(option, parentId, x.childs);
        }
      }
    }
  }

  let flattenedOptions = [];

  let space = [];
  function flattenSortedOptions(options, space) {
    for (let x of options) {
      flattenedOptions.push({ ...x, space });
      if (x.childs.length > 0) {
        flattenSortedOptions(x.childs, [...space, 0]);
      }
    }
  }

  flattenSortedOptions(sortedOptions, space);

  console.log({ sortedOptions });
  console.log({ flattenedOptions });

  useEffect(() => {
    window.addEventListener("click", () => {
      setOpen(false);
    });
  }, []);

  useEffect(() => {
    getSectors();
  }, []);

  useEffect(() => {
    if (sectorId) {
      console.log({
        find: flattenedOptions.find((sector) => sector._id === sectorId)?.name,
      });
      const sectorName = flattenedOptions.find(
        (sector) => sector._id === sectorId
      )?.name;
      setSelected(sectorName);
    }
  }, [sectorId]);

  return (
    <div className={styles.select}>
      <div
        className={styles.selected}
        onClick={(event) => {
          setOpen(true);
          event.stopPropagation();
        }}
      >
        <span>{selected}</span>
        <i className="uil uil-angle-down"></i>
      </div>
      {open && (
        <div className={styles.option_container}>
          {flattenedOptions.map((item) => {
            return (
              <div
                value={item._id}
                key={item._id}
                className={
                  styles.option +
                  " " +
                  `${sectorId === item._id && styles.selected_option}`
                }
                onClick={() => {
                  setSector(item._id);
                  setSelected(item.name);
                  setOpen(false);
                }}
              >
                {item.space?.map(() => (
                  <React.Fragment key={uuidv4()}>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </React.Fragment>
                ))}
                {item.name.split(" ").map((word) => (
                  <React.Fragment key={uuidv4()}>{word}&nbsp;</React.Fragment>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SelectSector;
