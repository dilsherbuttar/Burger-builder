import React from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import Toolbar from '..//Navigation/Toolbar/Toolbar';
import Sidedrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends React.Component {
    state = {
        showSideDrawer: true
    }
    sideBarClosedHandler = () => {
        this.setState({showSideDrawer: false})
    }

    render(){
        return(

            <Aux>
                <Toolbar />
                <Sidedrawer
                 
                open = {this.state.showSideDrawer}
                closed = {this.sideBarClosedHandler}/>
                <main className = {classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}


export default Layout;