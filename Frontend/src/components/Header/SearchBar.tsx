import React, { useRef, useEffect } from 'react';
import { Form, useNavigation, useSubmit } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface SearchBarProps {
    q: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ q }) => {
    const searchInput = useRef<HTMLInputElement>(null);
    const submit = useSubmit();
    const navigation = useNavigation();
    const { t } = useTranslation();

    const searching =
        navigation.location &&
        new URLSearchParams(navigation.location.search).has('q');

    useEffect(() => {
        if (searchInput.current) {
            searchInput.current.value = q;
        }
    }, [q]);

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const isFirstSearch = q == null;
            submit(event.currentTarget.form, {
                replace: !isFirstSearch,
            });
        }
    };

    return (
        <div className="hidden lg:block items-center space-x-4 pb-3">
            <Form id="search-form" role="search">
                <input
                    id="q"
                    ref={searchInput}
                    className={`${
                        searching ? 'loading' : ''
                    } rounded-md text-slate-900 dark:bg-slate-400 bg-sky-200 placeholder:text-slate-600 px-3 py-2 w-80 bg-gray-600 focus:outline-none focus:ring focus:border-blue-300`}
                    aria-label="Search contacts"
                    placeholder={t('search')}
                    type="search"
                    name="q"
                    defaultValue={q}
                    onKeyDown={handleKeyPress}
                />
                <div id="search-spinner" aria-hidden hidden={!searching} />
                <div className="sr-only" aria-live="polite"></div>
            </Form>
        </div>
    );
};

export default SearchBar;
