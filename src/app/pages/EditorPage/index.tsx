import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Features } from './Features';
import { useSelector } from 'react-redux';
import { selectFileEditing } from './Features/Editor/slice/selectors';
import { EditorBar } from 'app/components/EditorBar';

export function EditorPage() {
  const file = useSelector(selectFileEditing);
  return (
    <>
      <Helmet>
        <title>{file ? file.name : 'Editor'}</title>
        <meta name="description" content="IDE homepage" />
      </Helmet>
      <EditorBar />
      <Features />
    </>
  );
}
