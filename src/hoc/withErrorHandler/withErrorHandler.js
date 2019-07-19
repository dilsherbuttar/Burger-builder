import React from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux';


const withErrorHandler = (WrappedComponent, axios) => {
    return class extends React.Component {
        state = {
            error: null
        }
        componentWillMount() {
            //to remove the interceptors we need to make a reference of the interceptors in the class
            this.requestInterceptor = axios.interceptors.request.use( req => {
                this.setState({
                    error: null
                });
                return req;
            })
            this.responseInterceptor = axios.interceptors.response.use(res => res, err => {
                this.setState({
                    error: err
                })
            })
        }

        //The idea is to wrap the withErrorHandler HOC around multiple components. This might lead to memory leak so we need to eject the interceptors when the component is dismounted
        componentWillUnmount() {
            axios.interceptors.request.eject(this.requestInterceptor);//here we eject the reference we made in the class e.g this.requestInterceptor
            axios.interceptors.response.eject(this.responseInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({
                error: null
            })
        }
        render() {
            return (
                <Aux>
                    <Modal 
                    modalClosed = {this.errorConfirmedHandler}
                    show = {this.state.error}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            )
        }
    }
}

export default withErrorHandler;