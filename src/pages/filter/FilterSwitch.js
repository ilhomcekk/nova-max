import React from "react";
import "../../assets/scss/_filter.scss";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { BsChevronDown } from "react-icons/bs";

const FilterSwitch = ({ input, handleFilter }) => {
  switch (input.type) {
    case "checkbox":
      return (
        <>
          {input.is_filter === true && (
            <Accordion>
              <AccordionSummary
                expandIcon={<BsChevronDown />}
                aria-controls={`panel${input.id}a-content`}
                id={`panel${input.id}a-header`}
              >
                <Typography>{input.name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <div className="size__boxes">
                    {input.childs?.map((item) => (
                      <>
                        <label className="asad_checkbox">
                          <input
                            className="input-factories"
                            type="checkbox"
                            placeholder={item.value}
                            onChange={() =>
                              handleFilter(item.id, item.value, "checkbox")
                            }
                          />
                          <div>{item.value}</div>
                        </label>
                      </>
                    ))}
                  </div>
                </Typography>
              </AccordionDetails>
            </Accordion>
          )}
        </>
        // <div className="input-item">
        //   <p className="input-name-p">{input.name}</p>
        //   <div className="asad_fix">
        //     {input.childs?.map((item) => (
        //       <>
        //         <label className="asad_checkbox">
        //           <span>{item.value}</span>
        //           <input
        //             className="input-factories"
        //             type="checkbox"
        //             placeholder={item.value}
        //             onChange={() =>
        //               handleFilter(item.id, item.value, "checkbox")
        //             }
        //           />
        //         </label>
        //       </>
        //     ))}
        //   </div>
        // </div>
      );
    case "select":
      return (
        <>
          {input.is_filter === true && (
            <Accordion>
              <AccordionSummary
                expandIcon={<BsChevronDown />}
                aria-controls={`panel${input.id}a-content`}
                id={`panel${input.id}a-header`}
              >
                <Typography>{input.name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <select
                    className="input-factories"
                    onChange={(e) =>
                      handleFilter(input.id, e.target.value, "select")
                    }
                  >
                    <option value="">Выбрать подкатегорию</option>
                    {input.childs?.map((item) => {
                      return (
                        <option id={item.id} value={item.value}>
                          {item.value}
                        </option>
                      );
                    })}
                  </select>
                </Typography>
              </AccordionDetails>
            </Accordion>
          )}
          {/* <div className="input-item">
            <p className="input-name-p">{input.name}</p>
            <select
              className="input-factories"
              onChange={(e) => handleFilter(input.id, e.target.value, "select")}
            >
              <option value="">Выбрать подкатегорию</option>
              {input.childs?.map((item) => {
                return (
                  <option id={item.id} value={item.value}>
                    {item.value}
                  </option>
                );
              })}
            </select>
          </div> */}
        </>
      );
    case "input":
      return (
        <>
          {input.is_filter === true && (
            <Accordion>
              <AccordionSummary
                expandIcon={<BsChevronDown />}
                aria-controls={`panel${input.id}a-content`}
                id={`panel${input.id}a-header`}
              >
                <Typography>{input.name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <label className="flex items-center cursor-pointer">
                    <input
                      onChange={(e) =>
                        handleFilter(input.id, e.target.value, "input")
                      }
                      className="mr-2"
                      type="checkbox"
                    />
                    <p className="input-name-p">{input.name}</p>
                  </label>
                </Typography>
              </AccordionDetails>
            </Accordion>
          )}
        </>
      );

    default:
      return null;
  }
};

export default FilterSwitch;
