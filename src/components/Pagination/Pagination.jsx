import React from 'react';
import { Typography, Button } from '@mui/material';
import useStyles from './styles';
import { useGetMoviesQuery } from '../../services/TMDB';

const Pagination = ({ currentPage, setPage, totalPages }) => {
  const classes = useStyles();

  if (totalPages === 0) return null;
  const hanldePrev = () => {
    if (currentPage > 1) {
      setPage((prev) => currentPage - 1);
    }
  };

  const hanldeNext = () => {
    if (totalPages !== currentPage) {
      setPage((prev) => currentPage + 1);
    }
  };
  return (
    <div className={classes.container}>
      <Button
        onClick={hanldePrev}
        className={classes.button}
        variant="contained"
        color="primary"
        type="button"
      >
        Prev
      </Button>
      <Typography variant="h4" className={classes.pageNumber}>
        {currentPage}
      </Typography>
      <Button
        onClick={hanldeNext}
        className={classes.button}
        variant="contained"
        color="primary"
        type="button"
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
