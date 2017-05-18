/**
 * External dependencies
 */
import classNames from 'classnames';
import React, { PropTypes } from 'react';
import { partial } from 'lodash';

/**
 * Internal dependencies
 */
import EditorDrawer from 'post-editor/editor-drawer';
import EditorSidebarHeader from './header';
import SidebarFooter from 'layout/sidebar/footer';
import SidebarRegion from 'layout/sidebar/region';
import EditorActionBar from 'post-editor/editor-action-bar';
import EditorDeletePost from 'post-editor/editor-delete-post';
import EditorRevisionsList from 'post-editor/editor-revisions-list';
import { NESTED_SIDEBAR_NONE, NESTED_SIDEBAR_REVISIONS, NestedSidebarPropType } from './util';

const EditorSidebar = ( {
	isNew,
	isPostPrivate,
	loadRevision,
	nestedSidebar,
	onPublish,
	onSave,
	onTrashingPost,
	post,
	savedPost,
	selectedRevisionId,
	selectRevision,
	setPostDate,
	site,
	toggleNestedSidebar,
	toggleSidebar,
	type,
} ) => {
	const headerToggleSidebar = nestedSidebar === NESTED_SIDEBAR_NONE
		? toggleSidebar
		: partial( toggleNestedSidebar, NESTED_SIDEBAR_NONE );

	const sidebarClassNames = classNames(
		'post-editor__sidebar',
		{ 'is-nested-sidebar-focused': nestedSidebar !== NESTED_SIDEBAR_NONE }
	);

	return (
		<div className={ sidebarClassNames } >
			<EditorSidebarHeader nestedSidebar={ nestedSidebar } toggleSidebar={ headerToggleSidebar } />
			<EditorActionBar
				isNew={ isNew }
				post={ post }
				savedPost={ savedPost }
				site={ site }
				type={ type }
			/>
			<SidebarRegion className="editor-sidebar__parent-region">
				<EditorDrawer
					isNew={ isNew }
					isPostPrivate={ isPostPrivate }
					onPrivatePublish={ onPublish }
					onSave={ onSave }
					post={ post }
					savedPost={ savedPost }
					setPostDate={ setPostDate }
					site={ site }
					toggleNestedSidebar={ toggleNestedSidebar }
					type={ type }
				/>
			</SidebarRegion>
			<SidebarRegion className="editor-sidebar__nested-region">
				{
					nestedSidebar === NESTED_SIDEBAR_REVISIONS
						? <EditorRevisionsList
							loadRevision={ loadRevision }
							postId={ post.ID }
							selectedRevisionId={ selectedRevisionId }
							selectRevision={ selectRevision }
							siteId={ site.ID }
						/>
						: null
				}
			</SidebarRegion>
			<SidebarFooter>
				{ nestedSidebar === NESTED_SIDEBAR_NONE && (
					<EditorDeletePost post={ post } onTrashingPost={ onTrashingPost } />
				) }
			</SidebarFooter>
		</div>
	);
};

EditorSidebar.propTypes = {
	isNew: PropTypes.bool,
	isPostPrivate: PropTypes.bool,
	loadRevision: PropTypes.func,
	nestedSidebar: NestedSidebarPropType,
	onSave: PropTypes.func,
	onPublish: PropTypes.func,
	onTrashingPost: PropTypes.func,
	post: PropTypes.object,
	savedPost: PropTypes.object,
	selectedRevisionId: PropTypes.number,
	selectRevision: PropTypes.func,
	setPostDate: PropTypes.func,
	site: PropTypes.object,
	toggleNestedSidebar: PropTypes.func,
	toggleSidebar: PropTypes.func,
	type: PropTypes.string,
};

export default EditorSidebar;
