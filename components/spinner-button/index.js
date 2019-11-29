export default (props) => {
  let component;
  if (props.spinner)
    component = <div className="loading loading-lg"
      style={props.spinnerStyle}
    ></div>
  else
    component = <button className="btn input-group-btn"
      style={props.buttonStyle}
      onClick={props.onClick}
    >{props.children}</button>

  return component
}
