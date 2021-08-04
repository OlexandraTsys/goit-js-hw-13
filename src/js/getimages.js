import { moreButton } from './refs';
import axios from 'axios';
import Notiflix from 'notiflix';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const getImages = async (queryString, pages) => {
  try {
    if (queryString) {
      const { data: photos } = await axios.get(
        `?key=22716086-2fdd68696acd66b897a29f84e&q=${queryString}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${pages}`,
      );

      if (queryString && photos.totalHits > 0) {
        setTimeout(() => moreButton.classList.add('visible-button'), 300);
      }

      if (!photos.total) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.',
        );
      } else if (pages === 1) {
        Notiflix.Notify.success(`Hooray! We found ${photos.totalHits} images.`);
      }

      return photos;
    }
  } catch {
    Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
  }
};

export default getImages;
