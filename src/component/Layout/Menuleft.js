
import shipping from '../Layout/images/home/shipping.jpg'
import Brand from '../Product/Brand'
import Category from '../Product/Category'

function Menuleft(){
    return(
       <>
        <div className="col-sm-3">
        <div className="left-sidebar">
          <h2>Category</h2>
          <Category/>
          <Brand/>

          <div className="price-range">{/*price-range*/}
            <h2>Price Range</h2>
            <div className="well text-center">
              <input type="text" className="span2" defaultValue data-slider-min={0} data-slider-max={600} data-slider-step={5} data-slider-value="[250,450]" id="sl2" /><br />
              <b className="pull-left">$ 0</b> <b className="pull-right">$ 600</b>
            </div>
          </div>{/*/price-range*/}
          <div className="shipping text-center">{/*shipping*/}
            <img src={shipping} alt="" />
          </div>{/*/shipping*/}
        </div>
      </div>
      </>
    )
}
export default Menuleft