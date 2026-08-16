import mongoose from "mongoose";

const  messageSchema = new mongoose.Schema({
    role:{
        type:String,
        enum: ["user","assistant"],
        required : true
    },
    text: {
        type: String,
        required:true
    },

},  { 
    _id: false,
    timestamp : true
});
const activitySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["generate", "publish", "github", "vercel"],
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema({
    

user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      default: "Untitled project",
      maxlength: 80,
    },
    prompt: { type: String, default: "" },
    enhancedPrompt: { type: String, default: "" },
    html: { type: String, default: "" },
    published: { type: Boolean, default: false, index: true },
    publishedAt: { type: Date, default: null },
    messages: { type: [messageSchema], default: [] },
    activity: {
    type: [activitySchema],
    default: [],
    },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    viewedBy: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
      select: false,
    },
    likedBy: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
      select: false,
    },
    // For real Vercel deployments
    deployUrl: { type: String, default: "" },
    deployedAt: { type: Date, default: null },

}, { 
    timestamps:true
});

projectSchema.methods.toClient = function () {
    return{
        id: this._id.toString(),
        name:this.name,
        prompt:this.prompt,
        enhancedPrompt:this.enhancedPrompt,
        html:this.html,
        published:this.published,
        publishedAt:this.publishedAt,
        messages:this.messages,
        activity: this.activity,
        views:this.views,
        likes : this.likes,
        deployedUrl:this.deployedUrl,
        deployedAt:this.deployedAt,
        createdAt:this.createdAt,
        updatedAt:this.updatedAt

    };
};

projectSchema.methods.toPublicCard = function({withHtml = false}) {
    const card = {
        id:this._id.toString(),
        name:this.name,
        prompt : this.prompt,
        publishedAt:this.publishedAt,
        views:this.views,
        likes:this.likes,
        author:
        this.populated("user") && this.user?.name ? this.user.name:"SiteForge",
        };
        if(withHtml) card.html = this.html;
        return card;
    }

export const Project = mongoose.model("Project",projectSchema);
    
