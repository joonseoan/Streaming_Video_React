import React from 'react';
// since we use history from the file
//  BrowserRouter can't listen to that history from another react-router-dom component
//import { BrowserRouter, Route } from 'react-router-dom';

// Router is more comprehensive to listen to another history
import { Router, Route, Switch } from 'react-router-dom';

import StreamCreate from './streams/StreamCreate';
import StreamDelete from './streams/StreamDelete';
import StreamEdit from './streams/StreamEdit';
import StreamList from './streams/StreamList';
import StreamShow from './streams/StreamShow';
import Header from './Header';
import history from '../history';

// "Link: " In order to implement the singe page app without http req!
// const PageOne = () => {
//     return <Link to="/pageTwo">Page Two</Link>
// }

// const PageTwo = () => {
//     return <Link to="/">Page One</Link>;
// }

// const TestStreamPage = () => {
//     return<div>TestPage</div>;
// }

const App = () => {
    return(

        /***************************************************************************************************************************
            "history" function always looks at the url bar on the browser.
            Then when the url in the url bar switches to another, 
                    the "history" function again informs <BrowserRouter/> the “just changed url”. 
            Then again, <browserRouter> tries to match the informed url with the url/Route built in BrowserRouter.
            Therefore, url in the browser changes slightly faster than the component renders.
        ****************************************************************************************************************************/
       
        /*
            [ finding "/" ]
            Basically, localhost:3000 => is same as "localhost:3000/"
            Also, myapp.com => mayapp.com/, for instance.
            For this reason, when we open the app only with the hostname,
            "React-router-dom" directs us to the <Router path=”/” … />
       */

        /****************************************************************************************************************************
            [ exact ]
            The extracted “/page” from url bar contains the route “/” of the components => true (because the “/page” has “/” and “page”)
            The extracted “/page” from url bar contains the route “/page” in the components => true (because the “/page” has “/” and “page”)
            So when we use “/” or “/page” for “/page/new”, we need to define “exact” in the routes
            
            Another reason we must use "exact" here is because :
            - <Header /> has also a "/" route as mentioned up and above. It shows up at any pages
            - Therefore, we need to separate it from <Route path="/" exact />. It shows up only at "/" page

            Or otherwise, they must be ordered at the last lines
            <Switch /> can be used to resolve all issues above, BTW.
        *****************************************************************************************************************************/

        /* 
            route path :
            Actually each route does not have each page. All pages are in a same page.
            Instead, it blocks to render on the same page when the component paths are not identical with the url path.
        */

        /**************************************************************************************************************************** 
            Why should not use <a></a> in React or Redux
            1) <a> is a fully new client request by using HTTP.
                It has dependancy on the network. Therefore it can be slower.
            2) Also, when we navigate with <a> for instance in a navigation bar, 
                it dumps out the all the previous memories ******************* when it moves to the anouther menu.
        *****************************************************************************************************************************/

        <div className="ui container">
        {/* 

            // at outside of <BrowserRoute />
            // BrowserRouter cannot not block render it in the browser.
            // Just Bear in mind again that React-router-dom itself
            //  is to block the dom-based components rendering to the browser 
            //  if the url given the compoenent are not matched 
            //  with URL from the url bar. That is why React is single page app.
            <h1>Header!!!</h1>

            However!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11
            In this case, we can't use <Link> react-router-dom!!!!!!!!!!!!!!!!!
            
            In order to make use of the react-router
            Header should be inside BrowserRouter with no specification of "url path"
        */}
            {/* 
                since we import history....(best)
                The main reason to import another BrowserRouter history, 
                not to use the built-in object from 'react-router-dom' is because
                we need to use this history method in the components and also in action creators

                At action creators, we use async promise function like axios.
                Thus we should use promise call back (which might contain "redirect" to another component)
                However, redirect is a component of history (react-router-doem)
                We can't import react-router-dom in action creator. Therefore,
                we need to make a file component only for history to be used at any level of React and Redux.

                Otherwise, 1) we can directly call axios at the component level (worst)
                2) until the correct data is retuned to the redux store, we should wait (better)
                    ==> my restaurant app or customer survey
            */}
            <Router history={ history } >
            {/* 
            
                <BrowserRouter history={ history }>
            */}
                <Header />
                {/* must have <div /> */}
                <div>
                {/* 
                    <Route path="/" exact component={ PageOne } />
                    <Route path="/pageTwo" component = { PageTwo } />
                */}

                {/* 
                    <Switch />
                    The reason to use "Switch is because of widl card"
                    The wild card is able to get any variables like "1", "object","route" and etc.
                    Instead route is only taking letters + (number optionally) which is recognizable.

                    Therefore, "/streams/:id", a wild card is able to take "/streams/new" 
                    , a route. They become the same url, at this point even though
                    "exact is available."

                    "exact" is able to recognize the difference of "routes"
                        not to differentiate "wild card."
                
                */}
                    <Switch>
                        <Route path="/" exact component={ StreamList } />
                        {/* 
                            Basically, it will show up in every single /streams/* page
                            if the one below exists.

                            <Route path="/streams" component={ TestStreamPage } />
                        */}
                        <Route path="/streams/new" exact component={ StreamCreate } />
                        <Route path="/streams/edit/:id" exact component={ StreamEdit } />
                        <Route path="/streams/delete/:id" exact component={ StreamDelete } />
                        <Route path="/streams/:id" exact component={ StreamShow } />
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default App;