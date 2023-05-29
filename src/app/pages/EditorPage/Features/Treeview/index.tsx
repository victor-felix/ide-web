import * as React from 'react';
import { TreeItem, TreeView } from '@mui/lab';
import { Skeleton, Stack, Typography, Box } from '@mui/material';
import { ChevronRight, ExpandMore } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { HiFolder, HiFolderOpen } from 'react-icons/hi';
import { FaJava } from 'react-icons/fa';
import {
  selectFileSelected,
  selectFiletree,
  selectFoldersOpened,
  selectTreeviewLoaded,
  selectTreeviewLoading,
} from './slice/selectors';
import { useTreeviewSlice } from './slice';
import { TreeViewNode } from './slice/types';
import { useEditorSlice } from '../Editor/slice';
import { useTranslation } from 'react-i18next';
import { messages } from '../../messages';
import { selectFileEditing } from '../Editor/slice/selectors';
import DeleteFileModal from './components/DeleteFileModal';

export function Treeview() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { actions } = useTreeviewSlice();
  const { actions: editorActions } = useEditorSlice();

  const isLoading = useSelector(selectTreeviewLoading);
  const hasLoaded = useSelector(selectTreeviewLoaded);
  const fileTree = useSelector(selectFiletree);
  const foldersOpened = useSelector(selectFoldersOpened);
  const fileSelected = useSelector(selectFileSelected);
  const fileEditing = useSelector(selectFileEditing);

  if (!hasLoaded && !isLoading) {
    dispatch(actions.loadTreeview());
  }

  if (isLoading) {
    return (
      <Stack spacing={1}>
        <Skeleton variant="text" />
      </Stack>
    );
  }

  const handleClickFile = (node: TreeViewNode) => {
    if (!node.isDirectory) {
      if (fileEditing?.id !== node.id) {
        dispatch(editorActions.getFile(node.id));
        dispatch(actions.selectFile(node));
      }
    } else {
      if (foldersOpened.includes(String(node.id))) {
        dispatch(actions.closeFolder(String(node.id)));
      } else {
        dispatch(actions.openFolder(String(node.id)));
      }
    }
  };

  const getIcon = (node: TreeViewNode) => {
    if (Number(node.id) > 0) {
      if (node.isDirectory) {
        return foldersOpened.includes(String(node.id))
          ? HiFolderOpen
          : HiFolder;
      }

      return FaJava;
    }
  };

  const canDelete = (node: TreeViewNode) => {
    return (
      !node.isDirectory &&
      (foldersOpened.includes(String(node.id)) ||
        (fileSelected && fileSelected.id === node.id))
    );
  };

  const renderTree = (node: TreeViewNode) => (
    <TreeItem
      key={node.id}
      nodeId={String(node.id)}
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
          <Box component={getIcon(node)} color="inherit" sx={{ mr: 1 }} />
          <Typography
            variant="body2"
            sx={{ fontWeight: 'inherit', flexGrow: 1 }}
          >
            {Number(node.id) > 0 ? node.name : t(messages.projectLabel())}
          </Typography>
          {canDelete(node) && fileEditing && (
            <DeleteFileModal file={fileEditing} />
          )}
        </Box>
      }
      onClick={() => handleClickFile(node)}
    >
      {Array.isArray(node.children)
        ? node.children.map(node => renderTree(node))
        : null}
    </TreeItem>
  );

  const getSelectedNode = (): string => {
    if (fileSelected) {
      return String(fileSelected.id);
    }

    return '0';
  };

  return (
    <TreeView
      defaultCollapseIcon={<ExpandMore />}
      defaultExpandIcon={<ChevronRight />}
      expanded={foldersOpened}
      selected={getSelectedNode()}
    >
      {fileTree.map(children => renderTree(children))}
    </TreeView>
  );
}
