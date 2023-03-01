import React from 'react';
import display from '../../../resources/customizing_elements_images/Display.png';
import height from '../../../resources/customizing_elements_images/Height.png';
import width from '../../../resources/customizing_elements_images/Width.png';
import backgroundColor from '../../../resources/customizing_elements_images/BackgroundColor.png';
import text from '../../../resources/customizing_elements_images/textState.png';
import link from '../../../resources/customizing_elements_images/linkState.png';
import cssClasses from '../../../resources/customizing_elements_images/CSS.png';
import textGif from '../../../resources/customizing_elements_images/text.gif';

const Customization: React.FC<{
  classes: any;
  setPage: Function;
}> = ({ classes, setPage }) => {
  return (
    <div className={classes.wrapper}>
      <h1 className={classes.title}>Customization</h1>
      <hr />
      <p className={classes.text}>
        Customize your HTML elements on the canvas with the below features. Any changes <br/>
        made in the <span className={classes.notLink} onClick={() => setPage('Customization')}>
        customization</span> panel will be reflected immediately in the <span className={classes.notLink} onClick={() => setPage('Code Preview')}> 
        code preview </span> and demo render panel. See your changes in real time to decide what's best!<br/><br/>
        To customize an HTML element, drag it onto the canvas and select it on the canvas. Then use the desired customization feature.
        Once done, press the save button to save your customization changes.
      </p>
      <hr />
      <h2>Display</h2>
      <div className={classes.imgWrapper}>
        <img width='1300' src={display} />
      </div>
      <p className={classes.text}>
        After having moved a{' '}
        <span className={classes.notLink} onClick={() => setPage('Pages')}>
          page
        </span>
        ,{' '}
        <span
          className={classes.notLink}
          onClick={() => setPage('Reusable Components')}
        >
          component
        </span>
        ,{' '}
        <span
          className={classes.notLink}
          onClick={() => setPage('Route Links')}
        >
          route link
        </span>
        , or{' '}
        <span
          className={classes.notLink}
          onClick={() => setPage('HTML Elements')}
        >
          element
        </span>{' '}
        into the canvas, select the one that needs customizing simply by
        clicking on it.
      </p>
      <p className={classes.text}>
        If the display option 'flex' is chosen, a few more sub-options are
        displayed under the display option.
      </p>
      <hr />
      <h2>Width</h2>
      <div className={classes.imgWrapper}>
        <img width='1300' src={width} />
      </div>
      <p className={classes.text}>
        Change the width of each{' '}
        <span
          className={classes.notLink}
          onClick={() => setPage('Reusable Components')}
        >
          component
        </span>
        ,{' '}
        <span
          className={classes.notLink}
          onClick={() => setPage('Route Links')}
        >
          route link
        </span>
        , or{' '}
        <span
          className={classes.notLink}
          onClick={() => setPage('HTML Elements')}
        >
          element
        </span>
        .
      </p>
      <hr />
      <h2>Height</h2>
      <div className={classes.imgWrapper}>
        <img width='1300' src={height} />
      </div>
      <p className={classes.text}>
        Change the height of each{' '}
        <span
          className={classes.notLink}
          onClick={() => setPage('Reusable Components')}
        >
          component
        </span>
        ,{' '}
        <span
          className={classes.notLink}
          onClick={() => setPage('Route Links')}
        >
          route link
        </span>
        , or{' '}
        <span
          className={classes.notLink}
          onClick={() => setPage('HTML Elements')}
        >
          element
        </span>
        .
      </p>
      <hr />
      <h2>Background Color</h2>
      <div className={classes.imgWrapper}>
        <img width='1300' src={backgroundColor} />
      </div>
      <p className={classes.text}>
        Select an element and type in the color you wish to change the background
        color to and then click save.
      </p>
      <hr />
      <h2>Text</h2>
      <div className={classes.imgWrapper}>
        <img width='1300' src={text} />
      </div>
      <p className={classes.text}>
        Add HTML text to a selected element on the canvas by typing in the desired text. 
        <br></br>
        <br></br>
        You can also add state to the text of your element by clicking the "Use State" button. As shown in the example below, when you click "Use State", a window will pop up, showing all state available in the current component. You can click on any of these state variables and it will applied to the HTML text. When you click "Save", you can see a live Demo Render of your customization changes.
        <br></br>
        <br></br>
        <div className={classes.imgWrapper}>
        <img width='1000' src={textGif} />
      </div>
      </p>
      <hr />
      <h2>Link</h2>
      <div className={classes.imgWrapper}>
        <img width='1300' src={link} />
      </div>
      <p className={classes.text}>
        Add a hyperlink to a selected element on the canvas by typing in the url. 
      </p>
      <hr />
      <h2>CSS Classes</h2>
      <div className={classes.imgWrapper}>
        <img width='1300' src={cssClasses} />
      </div>
      <p className={classes.text}>
        Change the CSS class of a selected element on the canvas by typing in the class name. <br/>
        ReactType also comes with a default CSS file that is shown in the <span className={classes.notLink} onClick={() => setPage('CSS Editor')} >CSS editor</span>. 
        Add your own CSS classes to the <span className={classes.notLink} onClick={() => setPage('CSS Editor')} >CSS editor</span> or make changes to it to use
        custom CSS classes.
      </p>
      <hr />
    </div>
  );
};

export default Customization;
