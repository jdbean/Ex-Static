import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Joyride from 'react-joyride';
import { EVENTS } from 'react-joyride/es/constants';
import {
  viewedDocuments,
  // viewedDocumentsEdit,
  // noTour,
} from '../ducks/tour';

export class Tour extends React.Component {
  constructor(props) {
    super(props);
    // Setting up steps and run state based on props

    const initState = this.tourTypeSwitch();

    this.state = {
      run: initState.run,
      steps: initState.steps,
    };
  }

  tourTypeSwitch(tourType) {
    switch (this.props.tourType) {
      case 'documents': {
        const steps = [
          {
            target: '.title',
            content:
              "This tour will help you get your bearings on this page. Once you've read this message just click the purple 'Next' button to move on, or if you've had enough of the tour, press 'Skip' to complete it.",
            placement: 'center',
            disableBeacon: true,
          },
          {
            target: '.title',
            content:
              'Welcome to the Ex-Static project: a flexible interface for updating blogs made with the Jekyll Static Site Builder. The page that you are reading this on is associated with one specific blog. Any changes you make in Ex-Static will be immediatly reflected on that blog.',
            placement: 'center',
            disableBeacon: true,
          },
          {
            target: '.title',
            content:
              "This is the title of your blog. Selecting this link will bring you to your Website's homepage.",
            placement: 'auto',
          },
          {
            target: '.breadcrumbs',
            content:
              'Keep your eye here for "breadcrumbs" to help you navigate your site\'s files in Ex-Static.',
            placement: 'auto',
          },
          {
            target: 'div.documents-content > table',
            content:
              'This section contains the files that make up the posts on your Jekyll blog. Folder icons will appear if your post files have been organized into folders. Clicking on a folder name will let you access its contents.',
            placement: 'auto',
          },
          {
            target:
              'div.documents-content > table > thead > tr > th.right.aligned',
            content:
              "In the actions column, you'll find three buttons marked 'Delete', 'View', and 'Edit' for each file. Selecting 'Edit' will bring you to the edit screen for that post. Selecting 'View' will pop-up a live-preview of that file's corresponding page on your blog. Selecting 'Delete' will delete the file and its corresponding post on your website -- BE CAREFUL!",
            placement: 'left',
          },

          {
            target: '.page-buttons',
            content:
              'Selecting this button will bring you to a screen where you can create a new post for your blog',
            placement: 'auto',
          },
        ];
        const run = true;
        return { steps: steps, run: run };
      }
      case 'edit/new': {
        const steps = [
          {
            target: '.title',
            content:
              "This tour will help you get your bearings on this page. Once you've read this message just click the purple 'Next' button to move on, or if you've had enough of the tour, press 'Skip' to complete it.",
            placement: 'center',
            disableBeacon: true,
          },
        ];
        const run = true;
        return { steps: steps, run: run };
      }
      default: {
        return {
          run: false,
          steps: [],
        };
      }
    }
  }

  callback = data => {
    const { action, index, type } = data;
    // Update user preferences with completed tour flag
    if (type === EVENTS.TOUR_END) {
      const { viewedDocuments } = this.props;
      viewedDocuments();
    }
  };

  render() {
    // this.renderPrompt();
    const { steps, run } = this.state;

    return (
      <div className="tour">
        <Joyride
          continuous
          scrollToFirstStep
          showProgress
          showSkipButton
          steps={steps}
          run={run}
          callback={this.callback}
          styles={{
            options: {
              arrowColor: '#e3ffeb',
              primaryColor: '#8c6fca',
            },
          }}
        />
      </div>
    );
  }
}

Tour.propTypes = {
  documentsTour: PropTypes.bool.isRequired,
  documentsEditTour: PropTypes.bool.isRequired,
  tourType: PropTypes.string.isRequired,
  viewedDocuments: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  documentsTour: state.tour.documentsTour,
  documentsEditTour: state.tour.documentsEditTour,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ viewedDocuments }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tour);
