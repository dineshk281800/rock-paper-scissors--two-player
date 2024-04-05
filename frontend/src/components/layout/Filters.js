import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import helper from '../../helpers/helpers'
import constants from '../../constants/constants'
import StarRatings from 'react-star-ratings'


const Filters = () => {
  const [min, setMin] = useState(0)
  const [max, setMax] = useState(0)
  const navigate = useNavigate()
  let [searchParams] = useSearchParams()

  useEffect(() => {
    // after the refresh min, max value get from query
    searchParams.has("min") && setMin(searchParams.get("min"));
    searchParams.has("max") && setMax(searchParams.get("max"));
  }, [])
  // handle category & rating filter
  const handleClick = (checkbox) => {
    const checkboxes = document.getElementsByName(checkbox.name)

    // console.log(checkboxes)
    checkboxes.forEach((item) => {
      if (item !== checkbox) item.checked = false
    });

    if (checkbox.checked === false) {
      // Delete filter from query
      if (searchParams.has(checkbox.name)) {
        searchParams.delete(checkbox.name);
        const path = window.location.pathname + "?" + searchParams.toString()
        navigate(path);
      }
    } else {
      // set new filter value if already there
      if (searchParams.has(checkbox.name)) {
        searchParams.set(checkbox.name, checkbox.value);
      } else {
        // Append new filter 
        searchParams.append(checkbox.name, checkbox.value);
      }
      const path = window.location.pathname + "?" + searchParams.toString()
      navigate(path);
    }
  }

  // handle price filter
  const handlerButtonClick = (e) => {
    e.preventDefault()
    searchParams = helper.getPriceQueryParams(searchParams, 'min', min)
    searchParams = helper.getPriceQueryParams(searchParams, 'max', max)

    const path = window.location.pathname + "?" + searchParams.toString()
    navigate(path);
  }

  const defaultCheckHandler = (checkboxType, checkboxValue) => {
    const value = searchParams.get(checkboxType)
    if (checkboxValue === value) return true
    return false;
  }
  return (
    <div>
      <div className="border p-3 filter">
        <h3>Filters</h3>
        <hr />
        <h5 className="filter-heading mb-3">Price</h5>
        <form
          id="filter_form"
          className="px-2"
          onSubmit={handlerButtonClick}
        >
          <div className="row">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Min ($)"
                name="min"
                value={min}
                onChange={(e) => setMin(e.target.value)}
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Max ($)"
                name="max"
                value={max}
                onChange={(e) => setMax(e.target.value)}
              />
            </div>
            <div className="col">
              <button type="submit" className="btn btn-primary">GO</button>
            </div>
          </div>
        </form>
        <hr />
        <h5 className="mb-3">Category</h5>

        {constants.PRODUCT_CATEGORIES.map((category) => (
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              name="category"
              id="check4"
              value={category}
              defaultChecked={defaultCheckHandler("category", category)}
              onClick={(e) => handleClick(e.target)}
            />
            <label className="form-check-label" for="check4"> {" "} {category} </label>
          </div>
        ))}
        {/* <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="category"
            id="check5"
            value="Category 2"
          />
          <label className="form-check-label" for="check5"> Category 2 </label>
        </div> */}

        <hr />
        <h5 className="mb-3">Ratings</h5>

        {[5, 4, 3, 2, 1].map((rating) => (
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              name="ratings"
              id="check7"
              value={rating}
              defaultChecked={defaultCheckHandler("ratings", rating.toString())}
              onClick={(e) => handleClick(e.target)}
            />
            <label className="form-check-label" for="check7">
              <StarRatings
                rating={rating}
                starRatedColor="#ffb829"
                // changeRating={this.changeRating}
                numberOfStars={5}
                name='rating'
                starDimension='21px'
                starSpacing='1px'
              />
            </label>
          </div>

        ))}
      </div>
    </div>
  )
}


export default Filters