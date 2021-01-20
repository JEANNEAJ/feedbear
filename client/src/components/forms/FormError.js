const FormError = (props) => {
    return (
        <div>
            {props.error &&
                <p className="error">
                    <strong>form Error: </strong>
                    {props.error}
                </p>
            }
        </div>
    )
}

export default FormError;