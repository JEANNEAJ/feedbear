const FormError = (props) => {
    return (
        <div>
            {props.error &&
                <span className="error">
                    <strong>{props.errorMsg}</strong>
                </span>
            }
        </div>
    )
}

export default FormError;