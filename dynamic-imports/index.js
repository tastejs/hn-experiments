import { initialize } from './core/router.js';
import { GenericView } from './elements/generic-view.js';

const defineView = (viewClassName, urlName) => {
    return (props) => {
        return GenericView({ viewClassName, urlName, ...props });
    }
};

let routes = {
    '/': defineView('top-view', 'topstories'),
    '/news': defineView('news-view', 'newstories'),
    '/show': defineView('show-view','showstories'),
    '/ask': defineView('ask-view', 'askstories'),
    '/jobs': defineView('jobs-view', 'jobstories'),
};

const getComponent = (url) => {
    return import(url).then(component => {
         return component;
    });
}

const getComments = () => {
    getComponent('./views/comments-view.js').then(component => {
        routes['/item'] = component.CommentsView;
        initialize(routes, viewContainer, hooks);
    });
}
// TODO: Only fetch on navigation or when idle
getComments();

const viewContainer = document.querySelector('.view-container');

const hooks = {};

// Initialize the app
initialize(routes, viewContainer, hooks);
