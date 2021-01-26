import React, { Component } from 'react';

import Modal from '../../components/common/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = ( WrappedComponent, axios ) => {
    return class extends Component {
        constructor(props) {
            super(props);

            this.state = {
                error: null
            }
        }
        

        // due to the nature of a Component Lifecycle, 
        // these interceptors need to be written in componentWillMount to show the error Modal
        // I'm unsure how this can be changed otherwise for class component...
        UNSAFE_componentWillMount () {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        }

        // prevents memory leaks
        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render () {
            return (
                <Aux>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;

// import React, { Component } from 'react';

// import Modal from '../../components/common/Modal/Modal';
// import Aux from '../Aux/Aux';

// const withErrorHandler = (WrappedComponent, axios) => {
//     return class extends Component {
//         state = {
//             error: null
//         }

//         componentWillMount() {
//             axios.interceptors.request.use(req => {
//                 this.setState({error: null});
//                 return req;
//             });

//             axios.interceptors.response.use(res => res, error => {
//                 this.setState({error: error});
//             });
//         }

//         errorConfirmedHandler = () => {
//             this.setState({error: null})
//         }

//         render() {
//             return (
//                 <Aux>
//                     <Modal 
//                         show={this.state.error}
//                         modalClosed={this.errorConfirmedHandler}>
//                         {this.state.error ? this.state.error.message: null}
//                     </Modal>
//                     <WrappedComponent {...this.props} />
//                 </Aux>
//             );
//         }
//     }
// }

// export default withErrorHandler;