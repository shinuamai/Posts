import { Component } from '@angular/core'
import { DataApiService } from 'src/app/services/data-api.service'
import { Post } from 'src/app/models/Post'
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent {
  posts: Post[] = []
  editPost: Post = {} as Post
  removePost: Post = {} as Post

  currentPage = 1
  postsPerPage = 5
  totalPages: number = 0

  showEditModal = false
  showDeleteModal = false

  constructor(private dataService: DataApiService) { }

  ngOnInit() {
    this.getPosts()
  }

  getPosts() {
    const startIndex = (this.currentPage - 1) * this.postsPerPage
    const endIndex = startIndex + this.postsPerPage

    this.dataService.getData().subscribe(posts => {
        this.totalPages = Math.ceil(posts.length / this.postsPerPage)
        this.posts = posts.slice(startIndex, endIndex)

    })
  }

  updatePost() {
    this.dataService.updatePost(this.editPost)
      .subscribe(updatedPost => {
        const index = this.posts.findIndex(post => post.id === this.editPost.id)
        if (index !== -1) {
          this.posts[index] = updatedPost
        }
        this.closeModal()
      })
  }

  deletePost() {
    this.dataService.deletePost(this.removePost.id)
      .subscribe(() => {
        this.posts = this.posts.filter(post => post.id !== this.removePost.id)
        this.closeModal()
      })
  }

  openEditModal(post: Post) {
    this.editPost = { ...post }
    this.showEditModal = true
  }

  openDeleteModal(post: Post) {
    this.removePost = post
    this.showDeleteModal = true
  }

  closeModal() {
    this.showEditModal = false
    this.showDeleteModal = false
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++
      this.getPosts()
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--
      this.getPosts()
    }
  }
}
