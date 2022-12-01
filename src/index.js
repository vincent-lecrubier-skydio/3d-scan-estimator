import "./helper.css";
import { Estimator } from "./estimator";
import React from "react";
import { render } from "react-dom";
import { Formik, Field } from "formik";
import * as Yup from "yup";

const App = () => (
  <div className="app">
    <h1>
      Unofficial{" "}
      <a
        href="https://www.skydio.com/3d-scan"
        target="_blank"
        rel="noopener noreferrer"
      >
        Skydio 3DScan
      </a>{" "}
      estimator
    </h1>

    <Formik
      initialValues={{
        scanType: "flat horizontal",
        passes: "2pass optim",
        length: 20,
        width: 20,
        height: 20,
        gsd: 2,
        overlap: 80,
        sidelap: 80
      }}
      onSubmit={async (values) => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        alert(JSON.stringify(values, null, 2));
      }}
      validationSchema={Yup.object().shape({
        scanType: Yup.string().required("Required"),
        passes: Yup.string().required("Required"),
        length: Yup.number().required("Required"),
        width: Yup.number().required("Required"),
        height: Yup.number().required("Required"),
        gsd: Yup.number().required("Required"),
        overlap: Yup.number().required("Required"),
        sidelap: Yup.number().required("Required")
      })}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset
        } = props;
        return (
          <form onSubmit={handleSubmit}>
            <label htmlFor="scanType" style={{ display: "block" }}>
              Type of Scan
            </label>
            <Field
              id="scanType"
              as="select"
              name="scanType"
              className="text-input"
              onChange={handleChange}
            >
              <option value="flat horizontal">
                Flat horizontal surface (width * length)
              </option>
              <option value="rugged terrain">Rugged terrain</option>
              <option value="simple building">Simple building</option>
              <option value="indoor">Indoor space</option>
              <option value="single facade">
                Single facade (width * height)
              </option>
              <option value="tower">Tower</option>
              <option value="simple shape">Simple shape</option>
              <option value="complex shape">Complex shape</option>
              <option value="dense fractal shape">Dense fractal shape</option>
            </Field>

            <label htmlFor="passes" style={{ display: "block" }}>
              Passes (X / Y / Z)
            </label>
            <Field
              id="passes"
              as="select"
              name="passes"
              className="text-input"
              onChange={handleChange}
            >
              <option value="1pass">1 pass (X, Y or Z)</option>
              <option value="2pass optim">
                2 passes (X/Y, Y/Z or Z/X) with optimization
              </option>
              <option value="2pass">
                2 passes (X/Y, Y/Z or Z/X) without optimization
              </option>
              <option value="3pass optim">
                3 passes (X/Y/Z) with optimization
              </option>
              <option value="3pass">
                3 passes (X/Y/Z) without optimization
              </option>
            </Field>

            <label htmlFor="length" style={{ display: "block" }}>
              Scan Volume Length (m)
            </label>
            <input
              id="length"
              placeholder="5mm"
              type="text"
              value={values.length}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.length && touched.length
                  ? "text-input error"
                  : "text-input"
              }
            />
            {errors.length && touched.length && (
              <div className="input-feedback">{errors.length}</div>
            )}

            <label htmlFor="width" style={{ display: "block" }}>
              Scan Volume Width (m)
            </label>
            <input
              id="width"
              placeholder="5mm"
              type="text"
              value={values.width}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.width && touched.width
                  ? "text-input error"
                  : "text-input"
              }
            />
            {errors.width && touched.width && (
              <div className="input-feedback">{errors.width}</div>
            )}

            <label htmlFor="height" style={{ display: "block" }}>
              Scan Volume Height (m)
            </label>
            <input
              id="height"
              placeholder="5mm"
              type="text"
              value={values.height}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.height && touched.height
                  ? "text-input error"
                  : "text-input"
              }
            />
            {errors.height && touched.height && (
              <div className="input-feedback">{errors.height}</div>
            )}

            <label htmlFor="gsd" style={{ display: "block" }}>
              Ground Sample Distance (mm)
            </label>
            <input
              id="gsd"
              placeholder="5mm"
              type="text"
              value={values.gsd}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.gsd && touched.gsd ? "text-input error" : "text-input"
              }
            />
            {errors.gsd && touched.gsd && (
              <div className="input-feedback">{errors.gsd}</div>
            )}

            <label htmlFor="overlap" style={{ display: "block" }}>
              Overlap (%)
            </label>
            <input
              id="overlap"
              placeholder="80%"
              type="number"
              value={values.overlap}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.overlap && touched.overlap
                  ? "text-input error"
                  : "text-input"
              }
            />
            {errors.overlap && touched.overlap && (
              <div className="input-feedback">{errors.overlap}</div>
            )}

            <label htmlFor="sidelap" style={{ display: "block" }}>
              Sidelap (%)
            </label>
            <input
              id="sidelap"
              placeholder="80%"
              type="number"
              value={values.sidelap}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.sidelap && touched.sidelap
                  ? "text-input error"
                  : "text-input"
              }
            />
            {errors.sidelap && touched.sidelap && (
              <div className="input-feedback">{errors.sidelap}</div>
            )}

            {/* <button
              type="button"
              className="outline"
              onClick={handleReset}
              disabled={!dirty || isSubmitting}
            >
              Reset
            </button>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button> */}
            <Estimator {...props.values} />
            {/* <DisplayFormikState {...props} /> */}
          </form>
        );
      }}
    </Formik>

    {/* <MoreResources /> */}
  </div>
);

render(<App />, document.getElementById("root"));
