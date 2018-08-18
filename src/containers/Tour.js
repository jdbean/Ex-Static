import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Joyride from 'react-joyride';
import { EVENTS } from 'react-joyride/es/constants';
import {
  viewedDocuments,
  viewedDocumentsEdit,
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
            target: 'body',
            content:
              "This tour will help you get your bearings on this page. Once you've read this message just click the purple 'Next' button to move on. If you've had enough of the tour, press 'Skip' to complete it. If you want to see a previous dialogue screen again select 'Back'.",
            placement: 'center',
            disableBeacon: true,
          },
          {
            target: 'body',
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
            target: 'body',
            content:
              "This tour will help you get your bearings on the edit/new post screen. Once you've read this message just click the purple 'Next' button to move on. If you've had enough of the tour, press 'Skip' to complete it. If you want to see a previous dialogue screen again select 'Back'.",
            placement: 'center',
            disableBeacon: true,
          },
          {
            target: 'body',
            content:
              "The screen you're currently is used to add or edit posts on your jekyll blog. Post files in jekyll are composed of two sections: The first section is post content which is wirrten in a relatively simple language called Markdown. The second section is the configuration or metadata consists of something in a format called YAML which consists of label and value pairs. Jekyll is a powerful tool with lots of options so each blog may have its own special requirements and options that are impossible to cover on this tour.",
            placement: 'center',
            disableBeacon: true,
          },
          {
            target: 'body',
            content:
              "The content of this screen may change slightly depending on whether you are creating a brand new post or editing one that already exsists. We'll try to distinguish any difference whereever possible.",
            placement: 'center',
            disableBeacon: true,
          },
          {
            target: '.breadcrumbs',
            content:
              'This is the breadcrumbs section. It show you where you are in the file-hierachy of your site. You can navigate to the folder by pressing any of the links in this section.',
            placement: 'auto',
          },
          {
            target: '.input-path',
            content:
              "This is the input field for the post's path. All posts are required to have a valid path. Path is the name and location of the file in the site's source directory. When creating a new post, if you leave path blank, it will be autogenerated based on the title you provide and your present location in the file hierachy.",
            placement: 'auto',
          },
          {
            target: '.input-path > label > span > .fa.fa-info-circle',
            content:
              "Clicking on these icons will give you guidance on the corresponding field. If you don't pick something up during the tour, these info boxes will always be available for quick reference.",
            placement: 'auto',
          },
          {
            target: '.input-title',
            content:
              'This is the title field for your post. The title entered here is usually displayed prominently at the top of your post.',
            placement: 'auto',
          },
          {
            target: '.body-content',
            content:
              "This is the field where you write your post's body. You'll want to write using markdown and can view a quick HTML preview here. Press the ? symbol in the editor for a quick guide to markdown syntax. The editor contains convenient buttons for common markdown syntax, a full screen mode, and a split screen editor that displays both the editor and a preview at the same time.",
            placement: 'auto',
          },
          {
            target: 'div.metafields-wrapper:nth-child(5)',
            content:
              "This is the section where you add the metadata for your post. Each piece of metadata has a key (the type of metadata) and a value. Which types of metadata you want to enter depends on how your particular Blog is set up. Three common metadata keys are 'tags', 'author', and 'date'. If you enter date as a key, Ex-Static will help you out with a neat date-picker to make things a little easier.",
            placement: 'auto',
          },
          {
            target: 'div.meta-new',
            content: 'Click here to add a new key/value pair to your post',
            placement: 'auto',
          },
          {
            target: 'div.content-side',
            content:
              "These buttons depend on whether you are creating a new post or editing a preexsisting one. If you are creating a new post, your options are 'Cancel' which brings you back to the Ex-Static folder view and 'Create' which will save the post and add it to your blog. I you are editing a preexsisting post you'll see four options: 'Save', 'Visit', 'View', and Delete'. 'Save' will update the post on your blog with the changes you've made and 'Delete' will delete it from your blog and from Ex-Static completely. 'Visit' will open a new window with the post's page on your blog in a new tab while 'View' will pop up a quick preview of the post exactly as it appears on your blog.",
            placement: 'auto',
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
    // Update user preferences with completed tour flag for tourType
    const { tourType } = this.props;
    if (tourType === 'documents') {
      if (type === EVENTS.TOUR_END) {
        const { viewedDocuments } = this.props;
        viewedDocuments();
      }
    } else if (tourType === 'edit/new') {
      if (type === EVENTS.TOUR_END) {
        const { viewedDocumentsEdit } = this.props;
        viewedDocumentsEdit();
      }
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
              arrowColor: '#4298b5',
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
  viewedDocumentsEdit: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  documentsTour: state.tour.documentsTour,
  documentsEditTour: state.tour.documentsEditTour,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ viewedDocuments, viewedDocumentsEdit }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tour);
