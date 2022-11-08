import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';
import Box from './reusableComponents/Box';
import { Loader } from './reusableComponents/Loader/Loader';
import { HeaderH1, HeaderH2 } from './reusableComponents/Headers';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchContacts } from 'redux/operations';
import { selectError, selectIsLoading } from 'redux/selectors';
import { ErrorMessage } from './reusableComponents/ErrorMessage/ErrorMessage';

export default function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <Box m={4}>
      <HeaderH1>Phonebook</HeaderH1>
      <ContactForm />
      <HeaderH2>Contacts:</HeaderH2>
      <Filter />
      {!error ? <ContactList /> : <ErrorMessage />}
      {isLoading && <Loader />}
    </Box>
  );
}
