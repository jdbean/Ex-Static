import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Joyride from 'react-joyride';
import { EVENTS } from 'react-joyride/es/constants';
import {
  viewedDocuments,
  viewedDocumentsEdit,
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
              'Welcome to the Ex-Static project: a flexible interface for updating blogs made with the Jekyll Static Site Builder. You are viewing this prompt on an instance of Ex-Static that is associated with one specific blog. Any changes you make here Ex-Static will be immediatly reflected on that blog.',
            placement: 'center',
            disableBeacon: true,
          },
          {
            target: '.title',
            content:
              "This is the title of your blog. Selecting this link will bring you to your website homepage.",
            placement: 'auto',
          },
          {
            target: '.breadcrumbs',
            content:
              'Keep your eye on this area for "breadcrumbs" to help you navigate your site\'s folders and files in Ex-Static.',
            placement: 'auto',
          },
          {
            target: 'div.documents-content > table',
            content:
              'This section contains the files that make up the posts on your Jekyll blog. File are denoted with a file icon and if your post files are organized into folders they will be denoted with a folder icon. Clicking on a folder name will let you access its contents.',
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
              "This interface is used to add or edit posts on your Jekyll blog. Post files in jekyll are composed of two sections. The first section is post content which is wirrten in a relatively simple language called Markdown. The second section is the configuration or metadata which is written in a format called YAML which consists of pairs of keys (labels) and values. Jekyll is a powerful tool with lots of options so each blog may have its own special requirements and options that are impossible to cover on this tour.",
            placement: 'center',
            disableBeacon: true,
          },
          {
            target: 'body',
            content:
              "The content of this screen may change slightly depending on whether you are creating a brand new post or editing one that already exsists. We'll try to note any differences whereever possible.",
            placement: 'center',
            disableBeacon: true,
          },
          {
            target: '.breadcrumbs',
            content:
              "This is the breadcrumbs section. It shows you where you are in the hierachy of your site's post files. You can navigate to a folder by selecting the links that appear here.",
            placement: 'auto',
          },
          {
            target: '.input-path',
            content:
              "This is the input field for this post's path. A path is the name and location of the file in the site's source directory. All posts are required to have a valid path. When creating a new post, if you leave path blank, it will be autogenerated based on the title you provide and your present location in the file hierachy.",
            placement: 'auto',
          },
          {
            target: '.input-path > label > span > .fa.fa-info-circle',
            content:
              "Clicking on these help icons will give you guidance on the corresponding field. If you don't pick something up during the tour, these info boxes will always be available for quick reference.",
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
              "This is the section where you add metadata for your post. Each piece of metadata has a key (the type of metadata) and a value. Which types of metadata you want to enter depends on how your specific blog is configured. Three common metadata keys are 'tags', 'author', and 'date'. If you enter 'date' as a key, Ex-Static will help you out with a convenient date-picker to make things a little easier.",
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
              "The buttons that appear on this side bar depend on whether you are viewing this interface in the context of creating a new post or editing a preexsisting one. If you are creating a new post, your options are 'Cancel' which abandons your work and brings you back to the Ex-Static folder view and 'Create' which saves the post and adds it to your blog. If you are editing a preexsisting post you'll see four options: 'Save', 'Visit', 'View', and Delete'. 'Save' will update the current post on your blog with the changes you've made. 'Delete' will delete the current post from Ex-Static and from your blog entirely. 'Visit' will open a new window with the current post's web page on your blog while 'View' will pop up a quick preview of the current post exactly as it appears on your blog.",
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
